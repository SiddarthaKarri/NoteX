# 🧠 NoteX - Smart Note-Taking App

> *A powerful, open-source### 🔮 **Obsidian-Inspired Features (In Development)**
- **Note Linking** - Connect related thoughts and ideas *(Planned)*
- **Backlinks** ### 🔗 **Phase 4## 🔍 NoteX vs Other Apps

| Feature | NoteX | Obsidian | Apple Notes | Google Keep |
|---------|-------|----------|-------------|-------------|
| **Price** | 🟢 Free Forever | 🟡 Free Personal | 🟢 Free | 🟢 Free |
| **Mobile Experience** | 🟢 Native & Optimized | 🟡 Limited | 🟢 Good | 🟢 Good |
| **Open Source** | 🟢 Fully Open Source | 🔴 Closed Source | 🔴 Closed | 🔴 Closed |
| **Offline Access** | 🟢 Complete Support | 🟢 Yes | 🟡 Partial | 🟡 Partial |
| **Note Linking** | 🟡 Planned | 🟢 Advanced | 🔴 No | 🔴 No |
| **Rich Formatting** | 🟡 In Development | 🟢 Markdown | 🟢 Basic | 🟡 Limited |
| **Cross-Platform** | 🟢 iOS/Android/Web | 🟢 All Platforms | 🟡 Apple Only | 🟢 All Platforms |ctions (Obsidian-Inspired)**
- **Note Linking** - `[[Note Title]]` style linking
- **Backlinks** - See which notes link to current note
- **Link Suggestions** - Smart note connections
- **Note References** - Easy cross-referencing note connections *(Planned)*
- **Enhanced Search** - Advanced filtering and discovery
- **Rich Text Editor** - Better formatting options *(Coming Soon)*
- **Tags & Organization** - Advanced categorization system
- **Export Options** - Multiple format support *(Planned)*aking and knowledge management app built with React Native. Inspired by Obsidian's best features, designed for mobile-first experience.*

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.68.2-blue.svg)
![Expo](https://img.shields.io/badge/Expo-~45.0.0-lightgrey.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Open Source](https://img.shields.io/badge/100%25-Open%20Source-brightgreen.svg)

</div>

## 🎯 About NoteX

**NoteX is a free, open-source note-taking app that brings some of Obsidian's most loved features to mobile.** While not a complete Obsidian alternative, NoteX focuses on making powerful note-taking accessible on mobile devices with select features inspired by modern knowledge management tools.

## 🚀 Why Choose NoteX?

### 💸 **Completely Free & Open Source**
- No subscription fees or premium tiers
- All features available to everyone
- Community-driven development

### 📱 **Mobile-First Experience**
- Native mobile app optimized for touch
- Smooth performance on iOS & Android
- Offline-first architecture
- Cross-platform synchronization *(Coming Soon)*

### 🧠 **Obsidian-Inspired Features**
- **Smart Organization** - Folders, tags, and color coding
- **Note Linking** - Connect related thoughts *(Planned)*
- **Rich Text Support** - Enhanced formatting *(Coming Soon)*
- **Search & Discovery** - Find your notes instantly

## ✨ Current Features

### � **Core Note Management**
- **Create & Edit Notes** - Full-screen immersive writing experience
- **Dynamic Color Coding** - Visual organization with gradient backgrounds
- **Smart Organization** - Pin important notes to the top
- **Instant Search** - Find any note with real-time search
- **Drag & Drop Reordering** - Intuitive note organization
- **Bulk Operations** - Multi-select for efficient management

### 🎨 **Beautiful Interface**
- **Modern Material Design** - Clean, intuitive user experience
- **Custom Themes** - Personalize with vibrant color schemes
- **Gradient Backgrounds** - Beautiful visual hierarchy
- **Smooth Animations** - Fluid interactions with 60fps performance
- **Responsive Layout** - Optimized for all screen sizes

### ⚡ **Power Features**
- **Smart Reminders** - Never forget important notes
- **Share Integration** - Export notes to any platform
- **Trash Management** - Safe deletion with easy recovery
- **Labels & Tags** - Organize with custom categorization
- **Offline-First** - Full functionality without internet
- **Fast Performance** - Optimized for smooth scrolling and quick access

### � **Obsidian-Style Features (In Development)**
- **Note Linking** - Connect related thoughts and ideas
- **Backlinks** - See all notes that reference current note
- **Knowledge Graph** - Visual representation of note connections
- **Markdown Editor** - Rich text formatting with live preview
- **Folder Hierarchy** - Nested organization system
- **Plugin Architecture** - Extensible functionality

## 🛠️ Technical Stack

### Frontend Framework
- **React Native** `0.68.2` - Cross-platform mobile development
- **Expo SDK** `~45.0.0` - Development platform and tools
- **React** `17.0.2` - UI component library

### Navigation & State
- **React Navigation** `^6.0.11` - Screen navigation and routing
- **Context API** - Global state management
- **AsyncStorage** - Local data persistence

### UI & Animation
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **React Native Reanimated** `~2.8.0` - High-performance animations
- **Expo Vector Icons** - Comprehensive icon library
- **React Native Gesture Handler** - Touch interactions

### Enhanced Features
- **Expo Notifications** - Push notifications and reminders
- **React Native Actions Sheet** - Native action sheets
- **Draggable FlatList** - Reorderable lists
- **Expo Clipboard** - Copy/paste functionality
- **Moment.js** - Date and time formatting

### Development Tools
- **ESLint** - Code quality and consistency
- **Babel** - JavaScript compilation
- **Expo CLI** - Development workflow

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SiddarthaKarri/notex.git
   cd notex
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - **Mobile**: Download Expo Go app and scan QR code
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **Web Browser**: Press `w` in terminal

## 🏗️ Project Structure

```
notex/
├── 📁 components/          # Reusable UI components
│   ├── ActionButton.js     # Floating action button
│   ├── FolderCard.js       # Folder display component
│   ├── Modal.js            # Custom modal wrapper
│   ├── NoteCard.js         # Individual note display
│   ├── NoteOptionsActionSheet.js # Note actions menu
│   ├── NoteReminderModal.js # Reminder setting modal
│   ├── Notes.js            # Notes list container
│   └── NotesPageHeader.js  # Header with search
├── 📁 screens/             # Application screens
│   ├── AddNote.js          # Create new note
│   ├── UpdateNote.js       # Edit existing note
│   ├── Home.js             # Main notes dashboard
│   ├── Folders.js          # Folder management
│   ├── FolderNotes.js      # Notes within folders
│   ├── LabelsManager.js    # Label management
│   ├── NoteLabelsManager.js # Note-label assignment
│   ├── NotesSelector.js    # Multi-note selection
│   └── Trash.js            # Deleted notes
├── 📁 context/             # Global state management
│   └── context.jsx         # Notes context provider
├── 📁 Notifications/       # Push notification system
│   ├── scheduleReminderNotification.js
│   ├── cancelNotification.js
│   └── useNotifications.js
├── 📁 style/               # Design system
│   └── theme.js            # Colors, spacing, typography
├── 📁 utils/               # Utility functions
│   ├── storage.js          # AsyncStorage helpers
│   └── dateformat.js       # Date formatting
├── 📁 assets/              # Images and icons
└── AppNavigator.js         # Navigation configuration
```

## 🗺️ Development Roadmap

### 🎯 **Phase 1: Core Foundation (Current)**
- ✅ Basic note creation and editing
- ✅ Search and organization
- ✅ Tags and color coding
- ✅ Mobile-optimized interface
- ✅ Offline functionality

### 🔗 **Phase 2: Enhanced Organization (Next)**
- **Improved Search** - Advanced filtering and sorting
- **Better Tags** - Hierarchical tag system
- **Note Templates** - Quick note creation with templates
- **Enhanced Folders** - Better folder management

### � **Phase 3: Rich Text & Formatting**
- **Rich Text Editor** - Better formatting options
- **Markdown Support** - Basic markdown rendering
- **Media Attachments** - Images and file support
- **Export Features** - PDF, text, and other formats

### � **Phase 4: Advanced Markdown**
- **Live Markdown Editor** - Real-time preview with syntax highlighting
- **Mathematical Equations** - LaTeX support for formulas
- **Code Blocks** - Syntax highlighting for programming languages
- **Tables & Lists** - Rich formatting options

### ☁️ **Phase 5: Synchronization & Backup**
- **Cloud Sync** - Cross-device note access
- **Backup System** - Secure note backups
- **Import/Export** - Multiple format support
- **Version History** - Basic change tracking

## � NoteX vs Obsidian

| Feature | NoteX | Obsidian |
|---------|-------|----------|
| **Price** | 🟢 Free Forever | 🟡 Free Personal, Paid Commercial |
| **Mobile App** | 🟢 Native & Optimized | 🟡 Available but limited |
| **Open Source** | 🟢 Fully Open Source | 🔴 Closed Source |
| **Offline Access** | 🟢 Complete Offline Support | 🟢 Yes |
| **Graph View** | 🟡 Coming Soon | 🟢 Advanced |
| **Plugin System** | 🟡 Planned | 🟢 Extensive |
| **Markdown Support** | 🟡 In Development | 🟢 Full Support |
| **Community** | 🟡 Growing | 🟢 Large & Active |

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Device/platform information

### 💡 Feature Requests
Have an idea? We'd love to hear it:
- Describe the feature and its benefits
- Provide use cases and examples
- Consider implementation complexity

### 💻 Code Contributions
Ready to code? Follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 🔒 Security
Discovered a security vulnerability? Please email us at security@notex.app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Obsidian Team** for inspiring the vision of connected knowledge
- **Expo Team** for the amazing development platform
- **React Native Community** for continuous innovation
- **Open Source Contributors** who make free software possible

## 📞 Contact & Support

- **Email**: support@notex.app
- **Issues**: [GitHub Issues](https://github.com/yourusername/notex/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/notex/discussions)
- **Discord**: [Join our community](https://discord.gg/notex) *(Coming Soon)*

---

<div align="center">

**🧠 Making knowledge management accessible to everyone 🧠**

*"Your second brain shouldn't cost you your first paycheck"*

**⭐ Star this repository to support free, open-source knowledge tools! ⭐**

</div>
