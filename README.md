# EnergyShoes

EnergyShoes is a cross-platform mobile application built with React Native, designed for seamless shopping and management of footwear products. The app features a modern UI, multi-language support, and robust state management, making it ideal for both end-users and developers.

## Demo
[Video]

## Features

- Browse and search for shoes
- Add to cart,favourites and manage orders
- Control history of purchases
- Complete Payment Flow
- User authentication and profile management
- Push notifications (Firebase)
- Multi-language support => ar, en (i18next)
- Light mode & Dark mode
- Animated UI (Lottie)
- Persistent storage (MMKV)
- Testing ( Jest )
- Responsive layouts for iOS and Android

## Tools & Libraries Used

- **Redux Toolkit & react-redux**: State management
- **Firebase**: Push notifications and app services
- **i18next & react-i18next**: Internationalization
- **Lottie-react-native**: Animations
- **MMKV**: Fast storage
- **Yup & react-hook-form**: Form validation
- **Jest & Testing Library**: Testing
- **ESLint & Prettier**: Code quality and formatting
- **TypeScript**: Type safety

## Project Structure

```
EnergyShoes/
├── src/
│   ├── assets/         # Images, fonts, animations
│   ├── components/     # Reusable UI components
│   ├── constants/      # App constants and config
│   ├── data/           # Static data files
│   ├── localization/   # Language files
│   ├── navigation/     # Navigation setup
│   ├── screens/        # App screens
│   ├── store/          # Redux store
│   ├── theme/          # Styles and themes
│   └── utils/          # Utility functions
├── __tests__/          # Test files
├── android/            # Android native code
├── ios/                # iOS native code
├── App.tsx             # App entry point
├── package.json        # Project config
```

### Installation

```bash
git clone https://github.com/abdallah-dev76/EnergyShoes.git
cd EnergyShoes
yarn install
```

### Running the App

- **Android**:
  ```bash
  yarn android
  ```
- **iOS**:
  ```bash
  yarn ios
  ```

## Testing

Run all tests:

```bash
yarn test
```
