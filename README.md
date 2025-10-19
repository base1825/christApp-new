## ST10487874
## Project Overview

Christoffel’s Menu App is a mobile application built with React Native and Expo that allows a restaurant to manage and display its menu in a simple, interactive way.

The app serves two main user roles:

1. Chef / Admin

Can add new dishes with a name, description, price, and course type (Starter, Main, Dessert, Drink).

Can view all dishes in a list and remove them if needed.

2. Guest / Customer

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





















