<p align="center">
  <img src="https://www.kitchen-queue.com/static/media/AppLogo_350.6096b0395ddb2252e946.png" alt="Kitchen Queue Logo" width="400" />
</p>

---

### This repository is a **curated, read-only mirror** of Kitchen Queue’s front-end and design system. You are welcome to review the code and learn from our approach, but this project is **active, proprietary, and fully protected**. No code, assets, or designs from this repository may be copied, reused, or repurposed in any form.

## License

© 2025 Kitchen Queue. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification of this code, in whole or in part, is strictly prohibited.

---

### Built With

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![React](https://img.shields.io/badge/-React/React_Native-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
![Redux](https://img.shields.io/badge/Redux-7248B6?style=for-the-badge&labelColor=black&logo=redux&logoColor=7248B6)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&labelColor=black&logo=yarn&logoColor=232C8EBB)
![Nodejs](https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![FireBase](https://img.shields.io/badge/Firebase-a08021?style=for-the-badge&labelColor=black&logo=firebase&logoColor=ffcd34)
![Algolia](https://img.shields.io/badge/Algolia-5468FF?style=for-the-badge&labelColor=black&logo=algolia&logoColor=5468FF)
![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078d7?style=for-the-badge&labelColor=black&logo=visualstudiocode&logoColor=0078d7)
![Xcode](https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&labelColor=black&logo=Xcode&logoColor=007ACC)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&labelColor=black&logo=apple&logoColor=white)
![Android Studio](https://img.shields.io/badge/Android%20Studio-3DDC84.svg?style=for-the-badge&labelColor=black&logo=android-studio&logoColor=3DDC84)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&labelColor=black&logo=github&logoColor=white)
![Adobe Illustrator](https://img.shields.io/badge/adobe%20illustrator-%23FF9A00.svg?style=for-the-badge&labelColor=black&logo=adobe%20illustrator&logoColor=23FF9A00)
![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&labelColor=black&logo=adobe%20photoshop&logoColor=2331A8FF)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&labelColor=black&logo=android&logoColor=3DDC84)
![mac](https://img.shields.io/badge/iOS_/_oSX-%23000000.svg?style=for-the-badge&labelColor=black&logo=apple&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&labelColor=black&logo=windows&logoColor=0078D6)

---

# Kitchen Queue

**Know what you have. Cook what you love.**

**Kitchen Queue** is a comprehensive mobile application designed for families to share and streamline meal planning, grocery shopping, and kitchen inventory management. The app is built with React Native, leveraging Redux and Redux-Saga for state management, Firebase for authentication and Firestore for real-time database syncing. It uses a custom-built UI library (`KQ-UI`) for performance-focused, brand-consistent components.

---

## Core Features

### MVP Stage 1 (Free Version)

1. **User Management**

   - Firebase Authentication is used to securely manage user sign-up and login.

2. **Profile Management**

   - Users can create and manage their profiles, including personal information and settings.
   - Profiles are an extension of the user and are tied to a shared account.

3. **Account Management**

   - A primary account owner manages the account, which connects to all shared data including Shopping, Cupboard, and Recipes.
   - Each account can support up to 4 users/profiles.
   - Each account is limited to one shared Shopping list/cart, one Cupboard, and one Recipe Box.

4. **Shopping (List / Cart)**

   - A single Shopping (List / Cart) is shared across the account.
   - Users can add, edit, and move items between the List and the Cart.
   - Real-time updates are synced via Firestore across all connected users.
   - A “Checkout” action moves all Cart items into the Cupboard inventory.

5. **Cupboard Inventory Management**
   - A single Cupboard is shared across the account.
   - Users can track inventory across multiple storage types (e.g., pantry, fridge, freezer).
   - Item quantities are updated as users add, consume, or use ingredients via recipes.

---

### MVP Stage 2 (Subscription Base)

1. **Recipe Box**

   - Users can create and manage their own recipes.
   - Recipes check against the Cupboard to flag missing ingredients. _(In Development)_
   - Missing items can be added directly to the Shopping list. _(In Development)_
   - When a recipe is marked as "made," it deducts used ingredients from the Cupboard. _(In Development)_

2. **Favorite Items**

   - Users can create and store frequently used or purchased items for quick access when building Shopping lists.

3. **UPC Scanning**

   - Scan barcodes to quickly add items to Shopping or Cupboard inventories.

4. **Recipe Searching**

   - Search online recipes and save them to your personal Recipe Box.

5. **Community Recipe Box**

   - Share personal recipes within the community-contributed box (publicly or privately).
   - Users can browse, favorite, and add recipes to their box.

---

### Future Enhancements

1. **Meal Planning**

   - Plan meals by day, week, or month.
   - Automatically generate shopping lists for missing ingredients.

2. **Nutritional Information**

   - Analyze and display nutritional facts for recipes.
   - Help users make informed dietary choices.

3. **Additional Features**
   - Visionary ideas are under active exploration and will be revealed as development continues.

---

#### Thank you for visiting our public repository.

This repo is automatically updated whenever we publish changes to the main branch of the private Kitchen Queue project.
