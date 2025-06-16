# Geensnor stijl met Vale

Mooie teksten met de Geensnor stijl linter voor Vale

[vale.sh](https://vale.sh)

## Gebruik

Vale installeren: [https://vale.sh/docs/install](https://vale.sh/docs/install)


Voeg een .vale.ini toe aan je repository met daarin:

```
StylesPath = .vale/styles

Packages = https://github.com/geensnor/geensnor-stijl-vale/releases/latest/download/Geensnor.zip
```

Uitvoeren in je repository:
```
vale sync
```
Als je dan ook nog de [Visual Studio Code extentie](https://marketplace.visualstudio.com/items?itemName=ChrisChinchilla.vale-vscode) installeert, krijg je mooie meldingen als je lelijke teksten schrijft.
