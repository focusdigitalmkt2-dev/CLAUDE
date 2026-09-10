# Imagens

Coloque aqui as imagens reais e informe o caminho no componente correspondente.

| Pasta        | Uso                                                   | Onde substituir                                   |
|--------------|-------------------------------------------------------|---------------------------------------------------|
| `speakers/`  | Fotos dos palestrantes / equipe Focus                 | `Hero.tsx`, `AuthoritySection.tsx`                |
| `training/`  | Treinamento presencial, material, apostila            | `MindsetSection.tsx`, `DeliverablesSection.tsx`   |
| `clinic/`    | Secretária atendendo paciente, equipe de clínica      | `AudienceSection.tsx`                             |
| `cases/`     | Prints, agendas, conversas, indicadores (cases reais) | `src/content/cases.ts`                            |
| `/og.jpg`    | Imagem de compartilhamento (1200x630)                 | `src/app/layout.tsx`                              |
| `/logo.svg`  | Logo oficial                                          | `src/components/ui/Logo.tsx`                      |

Todo `<ImagePlaceholder />` aceita a prop `src`. Enquanto `src` não for informado, um placeholder
elegante com o rótulo do que deve ir ali é exibido.
