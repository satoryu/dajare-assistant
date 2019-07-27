# A Fulfillment for Google Assistant on Azure WebApps with Express

## Prerequisites

- node
- npm
- [azure-cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

## Usage

### Create Azure WebApps instance

After `az login` with your Microsoft account,

```sh
az group create -n dajare-assistant -l japaneast
az appservice plan create -n dajare-assistant-plan -g dajare-assistant -l japaneast --sku F1
az webapp create -n dajare-assistant-app -g dajare-assistant -p dajare-assistant-plan --deployment-local-git -r "node|10.6"
```

## Deploy

```sh
git remote add azure $(az webapp deployment source show -n dajare-assistant-app -g dajare-assistant --query "repoUrl")
git push azure master
```

## LISENCE

MIT
