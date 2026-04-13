# FastLocation 📍

Aplicativo mobile desenvolvido para entregadores da **FastDelivery**, permitindo consulta rápida de endereços por CEP ou por logradouro, com histórico local e integração com mapas.

> Trabalho acadêmico — Disciplina: **Desenvolvimento de Sistemas Móveis e Distribuídos**

---

## 📋 Sobre o Projeto

O **FastLocation** permite que entregadores consultem endereços rapidamente, sem precisar entrar em contato com a central da empresa.

### Funcionalidades

| Feature | Status |
|---|---|
| Consulta de endereço por CEP | ✅ |
| Busca de CEP por UF, Cidade e Logradouro | ✅ |
| Histórico de consultas (armazenamento local) | ✅ |
| Exibição do último endereço consultado | ✅ |
| Traçar rota até o endereço no mapa | ✅ |
| Loading durante requisições | ✅ |
| Tratamento de erro e estado vazio | ✅ |
| Tela splash com animação | ✅ |

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 9 ou superior
- **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Instalação

```bash
# Clone o repositório
git clone https://github.com/zevjr/senai-fastlocation-app
cd senai-fastlocation-app

# Instale as dependências
npm install
```

### Execução
Nessa maneira, é possivele escolher depois qual a forma que deseja executar.
Aqui, é a metodo mais genérico de executar a aplicação.
```bash
npm run start
```


### Executar no simulador

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Testes

```bash
# Modo watch (desenvolvimento)
npm test

# Execução única (CI)
npm run test:ci
```

---

## 🏗️ Arquitetura

O projeto segue **arquitetura modular** com separação rigorosa de responsabilidades:

```
src/
├── shared/                    # Recursos compartilhados entre módulos
│   ├── colors/                # Paleta de cores da aplicação
│   ├── components/            # Componentes reutilizáveis (Button, Input, LoadingIndicator)
│   ├── metrics/               # Dimensões, espaçamentos e tamanhos
│   └── storage/               # Lógica de armazenamento local (AsyncStorage)
│
├── http/                      # Configuração centralizada do Axios (ViaCEP API)
│
├── routes/                    # Configuração de navegação (React Navigation)
│
└── modules/
    ├── initial/               # Splash Screen com animação
    │   └── page/
    │
    ├── home/                  # Módulo principal de busca de endereços
    │   ├── components/        # AddressList, LastAddress, EmptySearch, AddressCard
    │   ├── controller/        # useHomeController + homeStore (Zustand)
    │   ├── model/             # Interfaces TypeScript (Address, AddressSearchParams)
    │   ├── repositories/      # Chamadas HTTP à API ViaCEP
    │   ├── service/           # Regras de negócio (homeService, mapService)
    │   └── page/              # UI da tela Home
    │
    └── history/               # Módulo de histórico de consultas
        ├── controller/        # useHistoryController
        └── page/              # UI da tela Histórico
```

### Responsabilidades de cada camada

| Camada | Responsabilidade | Restrições |
|---|---|---|
| **Page** | UI, renderização, interações | ❌ Sem API, sem business logic |
| **Controller** | Estado da tela, orquestração | ❌ Sem chamadas diretas à API ou storage |
| **Service** | Regras de negócio, validações | ❌ Sem UI logic |
| **Repository** | Chamadas HTTP, acesso ao storage | ❌ Sem business logic |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.74.5 | Framework mobile |
| Expo | ~51.0.28 | Toolchain e build |
| TypeScript | ^5.3.3 | Tipagem estrita |
| React Navigation | ^6.1.18 | Navegação entre telas |
| Axios | ^1.7.9 | Requisições HTTP |
| AsyncStorage | 1.23.1 | Armazenamento local |
| Zustand | ^4.5.5 | Gerenciamento de estado |
| react-native-map-link | ^2.12.0 | Integração com mapas |
| Jest + RNTL | ^29.7.0 | Testes unitários |

---

## 📡 API Externa — ViaCEP

Base URL: `https://viacep.com.br/ws`

| Endpoint | Descrição | Exemplo |
|---|---|---|
| `/{CEP}/json` | Consulta endereço por CEP | `/01310100/json` |
| `/{UF}/{Cidade}/{Logradouro}/json` | Busca CEPs por endereço | `/SP/SaoPaulo/AvenidaPaulista/json` |

---

## 🗺️ Integração com Mapas

O botão **"Traçar Rota"** no componente `LastAddress` abre o aplicativo de mapas do dispositivo com o endereço consultado como destino, utilizando a biblioteca `react-native-map-link`.

> **Nota técnica:** Como a API ViaCEP retorna apenas dados textuais (sem coordenadas geográficas), a busca no mapa é feita por string de endereço (`googleForceLatLon: false`). Em produção, recomenda-se integrar uma API de Geocodificação (Google Geocoding API) para fornecer coordenadas exatas ao `showLocation`.

---

## 🧪 Cobertura de Testes

```
__tests__/
├── shared/storage/index.test.ts          # Testes de armazenamento local
├── home/
│   ├── service/homeService.test.ts       # Testes de regras de negócio
│   ├── controller/homeController.test.ts # Testes de estado e transições
│   └── components/AddressList.test.tsx   # Testes de renderização
└── history/
    └── controller/useHistoryController.test.ts
```

Os testes validam:
- ✅ Chamadas corretas à API
- ✅ Transições de estado (loading → resultado → erro)
- ✅ Comportamento de armazenamento local
- ✅ Renderização dos componentes principais

---

## 📱 Telas

| Tela | Descrição |
|---|---|
| **Splash (Initial)** | Logo com animação de fade + scale, redireciona automaticamente |
| **Home** | Busca por CEP ou por endereço, resultados, último endereço |
| **Histórico** | Lista de todas as consultas realizadas, opção de limpar |

---

## 👨‍💻 Desenvolvido para

**Disciplina:** Desenvolvimento de Sistemas Móveis e Distribuídos  
**App:** FastLocation — para entregadores da **FastDelivery**