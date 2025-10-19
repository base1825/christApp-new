## ST10487874
## Project Overview

Christoffel’s Menu App is a mobile application built with React Native and Expo that allows a restaurant to manage and display its menu in a simple, interactive way.

The app serves two main user roles:

Chef / Admin

Can add new dishes with a name, description, price, and course type (Starter, Main, Dessert, Drink).

Can view all dishes in a list and remove them if needed.

Guest / Customer

Can browse the menu by categories (Starters, Mains, Desserts, Drinks).

Can filter dishes by course to see exactly what they want.

## Prerequisites

Node.js v18 or higher

npm or yarn

Expo CLI
Check Node and npm versions:

in your terminal :node -v or 
npm -v


Install Expo CLI if you haven’t already:

npm install -g expo

## Clone the repository:

git clone <>
cd christApp-new


Install dependencies: use

npm install

Start the project:

npx expo start

## Running the App

Press a to open in Android Emulator.

Press i to open in iOS Simulator.

Or scan the QR code with Expo Go on your mobile device.
## Features

1.Home Screen

Displays menu categories in boxes

Buttons:

Add Menu (requires chef permission) only the chef can access

View Full Menu (go to Filter Menu)

Add Menu

Add a dish with:

Name, Description, Price, Course

Dish is saved in React Context

Back button included

Filter Menu

View all dishes

Filter by course: Starter, Main, Dessert, Drink

Remove dishes

Back button included on each.






















# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
