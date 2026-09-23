#!/usr/bin/env bash
# =============================================================================
#  Landing page "Secretárias de Alta Performance" — instalador para VPS (Debian/Ubuntu)
#
#  Uso (como root, no terminal do VPS):
#    bash <(curl -fsSL https://raw.githubusercontent.com/focusdigitalmkt2-dev/CLAUDE/claude/landing-page-secretarias-s4yy4w/deploy/hostinger-vps.sh) seudominio.com.br
#
#  Opcional: link do MP4 da VSL (link direto ou do Google Drive "qualquer pessoa com o link")
#    bash <(curl -fsSL ...) seudominio.com.br "https://drive.google.com/file/d/ID/view"
#
#  O que faz:
#    1. instala o servidor web Caddy (HTTPS automático com Let's Encrypt)
#    2. baixa o site pronto da branch "site-hostinger" do GitHub
#    3. cria uma tarefa que verifica a cada 5 minutos se há versão nova e atualiza sozinha
#    4. (opcional) baixa o MP4 da VSL para /video/vsl.mp4
#  Pode ser executado quantas vezes quiser (é idempotente).
# =============================================================================
set -euo pipefail

REPO="focusdigitalmkt2-dev/CLAUDE"
BRANCH="site-hostinger"
SITE_DIR="/var/www/secretarias"
DOMAIN="${1:-}"
MP4_URL="${2:-}"

say() { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31mERRO: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" = 0 ] || die "execute como root (ou com sudo)."
[ -n "$DOMAIN" ] || die "informe o domínio. Ex.: bash hostinger-vps.sh seudominio.com.br"
DOMAIN="${DOMAIN#https://}"; DOMAIN="${DOMAIN#http://}"; DOMAIN="${DOMAIN%%/*}"
case "$DOMAIN" in www.*) DOMAIN="${DOMAIN#www.}";; esac

export DEBIAN_FRONTEND=noninteractive

say "Instalando utilitários"
# Repositórios de terceiros quebrados (ex.: postgresql) não podem travar a instalação.
apt-get update -qq 2>/dev/null || echo "(aviso: algum repositório do apt está com problema; seguindo mesmo assim)"
apt-get install -y -qq curl unzip ca-certificates gnupg >/dev/null 2>&1 || true
for bin in curl unzip; do command -v "$bin" >/dev/null 2>&1 || die "não consegui instalar '$bin'. Rode: apt-get install -y $bin"; done

# ---------------------------------------------------------------- Caddy
if ! command -v caddy >/dev/null 2>&1; then
  # Algo já ocupa as portas 80/443? (ex.: nginx, apache, docker) Não vamos brigar por elas.
  busy=$(ss -ltnp 2>/dev/null | awk '$4 ~ /:(80|443)$/ {print $NF}' | grep -oE '"[^"]+"' | sort -u | tr -d '"' | tr '\n' ' ' || true)
  if [ -n "$busy" ]; then
    die "as portas 80/443 já estão em uso por: $busy. Me mande esta mensagem que eu ajusto a instalação para conviver com esse serviço."
  fi
  say "Instalando o Caddy (servidor web com HTTPS automático)"
  installed=0
  if curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg 2>/dev/null \
     && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list; then
    # atualiza SÓ a lista do Caddy, ignorando os outros repositórios
    apt-get update -qq -o Dir::Etc::sourcelist="sources.list.d/caddy-stable.list" \
      -o Dir::Etc::sourceparts="-" -o APT::Get::List-Cleanup="0" >/dev/null 2>&1 || true
    apt-get install -y -qq caddy >/dev/null 2>&1 && installed=1
  fi
  if [ "$installed" != 1 ]; then
    echo "apt não conseguiu instalar o Caddy; baixando o binário oficial"
    curl -fsSL "https://caddyserver.com/api/download?os=linux&arch=amd64" -o /usr/local/bin/caddy
    chmod +x /usr/local/bin/caddy
    id -u caddy >/dev/null 2>&1 || useradd --system --home /var/lib/caddy --create-home --shell /usr/sbin/nologin caddy
    mkdir -p /etc/caddy /var/lib/caddy /var/log/caddy
    chown -R caddy:caddy /var/lib/caddy /var/log/caddy
    cat > /etc/systemd/system/caddy.service <<'CSVC'
[Unit]
Description=Caddy
After=network.target network-online.target
Requires=network-online.target
[Service]
Type=notify
User=caddy
Group=caddy
ExecStart=/usr/local/bin/caddy run --environ --config /etc/caddy/Caddyfile
ExecReload=/usr/local/bin/caddy reload --config /etc/caddy/Caddyfile --force
TimeoutStopSec=5s
LimitNOFILE=1048576
PrivateTmp=true
ProtectSystem=full
AmbientCapabilities=CAP_NET_BIND_SERVICE
[Install]
WantedBy=multi-user.target
CSVC
    systemctl daemon-reload
  fi
  command -v caddy >/dev/null 2>&1 || die "Caddy não foi instalado."
fi

# ---------------------------------------------------------------- Atualizador
say "Instalando o atualizador do site"
mkdir -p "$SITE_DIR/video"
cat > /usr/local/bin/atualizar-site-secretarias <<'UPD'
#!/usr/bin/env bash
# Baixa a versão mais nova do site (branch site-hostinger) se ela mudou. Preserva /video.
set -euo pipefail
REPO="focusdigitalmkt2-dev/CLAUDE"; BRANCH="site-hostinger"; SITE_DIR="/var/www/secretarias"
FORCE="${1:-}"
remote=$(curl -fsSL -H 'Accept: application/vnd.github.sha' "https://api.github.com/repos/$REPO/commits/$BRANCH" 2>/dev/null || true)
local_sha=$(cat "$SITE_DIR/.deployed-sha" 2>/dev/null || true)
if [ -z "$remote" ]; then echo "GitHub indisponível agora; tento de novo depois."; exit 0; fi
if [ "$remote" = "$local_sha" ] && [ "$FORCE" != "--force" ]; then exit 0; fi
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
curl -fsSL "https://codeload.github.com/$REPO/zip/refs/heads/$BRANCH" -o "$tmp/site.zip"
unzip -q "$tmp/site.zip" -d "$tmp/x"
src=$(find "$tmp/x" -mindepth 1 -maxdepth 1 -type d | head -1)
[ -f "$src/index.html" ] || { echo "pacote sem index.html; abortando"; exit 1; }
new="$SITE_DIR.new"; rm -rf "$new"; mkdir -p "$new"
cp -a "$src"/. "$new"/
# mantém o vídeo enviado manualmente
mkdir -p "$new/video"
if [ -d "$SITE_DIR/video" ]; then cp -a "$SITE_DIR/video"/. "$new/video"/ 2>/dev/null || true; fi
echo "$remote" > "$new/.deployed-sha"
chown -R caddy:caddy "$new" 2>/dev/null || true
old="$SITE_DIR.old"; rm -rf "$old"
[ -d "$SITE_DIR" ] && mv "$SITE_DIR" "$old"
mv "$new" "$SITE_DIR"; rm -rf "$old"
echo "site atualizado para ${remote:0:7} em $(date '+%d/%m %H:%M')"
UPD
chmod +x /usr/local/bin/atualizar-site-secretarias

cat > /etc/systemd/system/atualizar-site-secretarias.service <<'SVC'
[Unit]
Description=Atualiza a landing page Secretárias a partir do GitHub
After=network-online.target
[Service]
Type=oneshot
ExecStart=/usr/local/bin/atualizar-site-secretarias
SVC
cat > /etc/systemd/system/atualizar-site-secretarias.timer <<'TMR'
[Unit]
Description=Verifica a cada 5 minutos se há versão nova do site
[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
RandomizedDelaySec=60
[Install]
WantedBy=timers.target
TMR
systemctl daemon-reload
systemctl enable --now atualizar-site-secretarias.timer >/dev/null

say "Baixando a versão atual do site"
/usr/local/bin/atualizar-site-secretarias --force

# ---------------------------------------------------------------- MP4 (opcional)
if [ -n "$MP4_URL" ]; then
  say "Baixando a VSL em MP4"
  url="$MP4_URL"
  if printf '%s' "$url" | grep -q "drive.google.com"; then
    fid=$(printf '%s' "$url" | grep -oE '/d/[^/?]+|id=[^&]+' | head -1 | sed -E 's#^/d/##; s#^id=##')
    url="https://drive.usercontent.google.com/download?id=$fid&export=download&confirm=t"
  fi
  curl -fL --retry 3 -o "$SITE_DIR/video/vsl.mp4.part" "$url"
  if head -c 12 "$SITE_DIR/video/vsl.mp4.part" | grep -q "ftyp"; then
    mv "$SITE_DIR/video/vsl.mp4.part" "$SITE_DIR/video/vsl.mp4"
    echo "MP4 salvo: $(du -h "$SITE_DIR/video/vsl.mp4" | cut -f1)"
  else
    rm -f "$SITE_DIR/video/vsl.mp4.part"
    echo "AVISO: o link não entregou um arquivo MP4 (é um link direto/público?). O site segue com o YouTube."
  fi
fi
chown -R caddy:caddy "$SITE_DIR" 2>/dev/null || true

# ---------------------------------------------------------------- Caddy config
say "Configurando o domínio $DOMAIN no Caddy"
WWW_BLOCK=""
case "$DOMAIN" in
  *.hstgr.cloud) ;;  # hostname temporário da Hostinger: não existe www.
  *) WWW_BLOCK="www.$DOMAIN {
	redir https://$DOMAIN{uri} permanent
}
";;
esac
cat > /etc/caddy/Caddyfile <<CADDY
# Landing page Secretárias de Alta Performance (gerado por deploy/hostinger-vps.sh)
$WWW_BLOCK
$DOMAIN {
	root * $SITE_DIR
	encode zstd gzip
	file_server
	handle_errors {
		@404 expression {http.error.status_code} == 404
		rewrite @404 /404.html
		file_server
	}
	@immutable path /_next/static/*
	header @immutable Cache-Control "public, max-age=31536000, immutable"
	@media path /images/* /video/* *.woff2 /icon.png
	header @media Cache-Control "public, max-age=604800"
	@html path / *.html */
	header @html Cache-Control "no-cache"
	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
		-Server
	}
}
CADDY
caddy validate --config /etc/caddy/Caddyfile >/dev/null
systemctl enable caddy >/dev/null 2>&1 || true
systemctl restart caddy

# ---------------------------------------------------------------- Firewall
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null
fi

# ---------------------------------------------------------------- Resumo
ip=$(curl -fsS -4 https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')
dns=$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk '{print $1}' | head -1 || true)
say "Pronto"
echo "  Site em:        https://$DOMAIN"
echo "  Pasta:          $SITE_DIR   (vídeo: $SITE_DIR/video/vsl.mp4)"
echo "  IP deste VPS:   $ip"
echo "  DNS do domínio: ${dns:-não resolve ainda}"
if [ -z "$dns" ] || [ "$dns" != "$ip" ]; then
  echo
  echo "  ATENÇÃO: aponte o domínio para este VPS. No painel da Hostinger → Domínios → $DOMAIN → DNS:"
  echo "    registro A   @    $ip"
  echo "    registro A   www  $ip"
  echo "  Assim que o DNS apontar, o Caddy emite o certificado HTTPS sozinho (1 a 2 minutos)."
fi
echo
echo "  Atualização automática: a cada 5 min (branch $BRANCH). Forçar agora: atualizar-site-secretarias --force"
echo "  Ver logs do servidor:   journalctl -u caddy -n 50"
