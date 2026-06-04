SuperAppSandbox/
├── 📂 .expo/                        # Expo CLI configuration and cache files
├── 📂 android/                      # Native Android project configuration
├── 📂 ios/                          # Native iOS project configuration (highly recommended to include)
├── 📂 assets/                       # Static assets (images, fonts, splash screens)
├── 📂 scripts/                      # Utility scripts (e.g., husky, project resets)
│   └── 📄 reset-project.js
├── 📂 src/                          # Main application source code
│   ├── 📂 app/                      # EXPO ROUTER (Strictly Routing & Layouts only)
│   │   ├── 📄 _layout.tsx           # Root Layout (Toggles Native Splash -> Custom Splash)
│   │   ├── 📄 index.tsx             # Home Route (/)
│   │   ├── 📄 sandbox.tsx           # Sandbox Route (/sandbox)
│   │   └── 📄 +not-found.tsx        # Fallback 404 screen (Expo Router standard)
│   │
│   ├── 📂 bridge/                   # Core Web-to-Native communication engine
│   │   ├── 📂 handlers/             # Core message parsers and routers
│   │   ├── 📂 native/               # Native bridge modules and interfaces
│   │   └── 📄 index.ts              # Unified entry point for bridge operations
│   │
│   ├── 📂 components/               # GLOBAL SHARED COMPONENTS (Strictly Presentational)
│   │   ├── 📂 ui/                   # Design system atoms (Atomic, zero business logic)
│   │   │   ├── 📄 button.tsx        # Reusable Button (handles web/native states)
│   │   │   ├── 📄 collapsible.tsx   # Shared collapsible container
│   │   │   └── 📄 text.tsx          # Custom themed-text wrapper
│   │   └── 📂 navigation/           # Shared layout UI
│   │       ├── 📄 app-tabs.tsx      # Mobile bottom tabs UI
│   │       └── 📄 app-tabs.web.tsx  # Web-optimized sidebar/navbar UI
│   │
│   ├── 📂 constants/                # Global configurations
│   │   ├── 📄 config.ts             # API URLs, environment flags, feature toggles
│   │   └── 📄 theme.ts              # Global Tailwind/Style configurations and palettes
│   │
│   ├── 📂 context/                  # App-wide Global State Providers
│   │   ├── 📄 auth-context.tsx      # User session management
│   │   ├── 📄 bridge-context.tsx    # Native-WebView bridge state provider
│   │   └── 📄 theme-context.tsx     # Light/Dark mode state management
│   │
│   ├── 📂 features/                 # FEATURE-FIRST DOMAINS (The Core Scalability Engine)
│   │   ├── 📂 splash/                 # Everything specific to the splash screen
│   │   │   ├── 📂 components/       # Components unique to the splash screen
│   │   │   └── 📂 hooks/            # Custom hooks used only on splash screen
│   │   ├── 📂 home/                 # Everything specific to the Home view
│   │   │   ├── 📂 components/       # Components unique to the home screen
│   │   │   └── 📂 hooks/            # Custom hooks used only on home screen
│   │   │
│   │   └── 📂 sandbox/              # Everything specific to the Sandbox view
│   │       ├── 📂 components/       # Sandbox-only UI elements
│   │       ├── 📂 hooks/            # e.g., useSandboxState.ts
│   │       └── 📂 services/         # API or local mock data fetching for sandbox
│   │
│   ├── 📂 hooks/                    # TRULY GLOBAL SHARED HOOKS
│   │   ├── 📄 use-color-scheme.ts
│   │   ├── 📄 use-color-scheme.web.ts
│   │   └── 📄 use-is-online.ts      # Network connectivity hook
│   │
│   ├── 📂 types/                    # Global TypeScript Type definitions
│   │   ├── 📄 bridge.types.ts       # Shared types for web-to-native messages
│   │   └── 📄 env.d.ts              # Environment variable typing
│   │
│   └── 📄 global.css                # Tailwind CSS core configuration
│
├── 📄 app.json                      # Expo project configuration metadata
├── 📄 package.json                  # React Native v0.85, Expo v56, React 19 dependencies
├── 📄 tailwind.config.js            # Tailwind configuration (Must point to /src)
├── 📄 tsconfig.json                 # TypeScript compiler configuration (Uses Path Aliases)
└── 📄 README.md