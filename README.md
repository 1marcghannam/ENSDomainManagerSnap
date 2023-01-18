# ENS Domain Manager Snap for MetaMask

## I. Introduction

This is a Snap for MetaMask that allows users to manage their ENS domains by adding or removing notifications for their expiration dates.

## II. Features

- Add or remove notifications for ENS domain expiration dates
- Receive in-app notifications for expiring domains
- Manage the list of domains with expiration date notifications

## III. Pre-requisites

- [MetaMask Flask](https://metamask.io/flask/) installed and connected to the Ethereum Mainnet
- [Yarn](https://yarnpkg.com/) installed

## IV. Technical Overview

### 1. Snap

The Snap is a Node.js application that runs in the background of MetaMask Flask. It is built using the [Snap development framework](https://docs.metamask.io/guide/snaps.html#extend-the-functionality-of-metamask)

### 2. React App

The React App is a web application that runs in the foreground of MetaMask Flask. It is built using [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)

## V. Local Setup

### 1. Clone the repository

```bash
$ git clone https://github.com/1marcghannam/ENSDomainManagerSnap.git
```

### 2. Install dependencies

```bash
$ cd ENSDomainManagerSnap
$ yarn install
```

### 3. Run the Snap

```bash
$ yarn start
```

## VI. Using the Snap

### 1. Add the Snap

- Once you have the Snap running locally, open the React App at http://localhost:8000 in your browser after connecting to the website with MetaMask Flask.
- After connecting your MetaMask Flask account to the website, click on the prompted button "Approve & install".
- You should see the Snap installed in your MetaMask Flask account if you go to: Settings > Snaps.

### 2. Add or Remove a domain

- Type in a domain name without the .eth extension and click on the "Add / Remove Notification" button. If the domain is not registered, you will be prompted an error on the website. If the domain is registered, you will be prompted to add a notification for its expiration date. Although if the domain is registered and you already have a notification for its expiration date, you will be prompted to remove the notification.
- Once you have added a notification for a domain, you will be prompted with a notification in MetaMask Flask when the domain is about to expire (within 7 days of expiring).
- There will be a cron job running in the background that checks for domain expiration dates every 24 hours. If a domain is about to expire, you will be prompted with a notification in MetaMask Flask.

## VII. Testing

### 1. Run the tests

Run tests for the Snap `utils.ts` functions:

```bash
$ cd ./packages/snap
$ yarn test
```
