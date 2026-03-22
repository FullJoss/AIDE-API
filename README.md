# 🚀 Projet AIDE - API de Liaison Intelligente

<img width="204" height="192" alt="image" src="https://github.com/user-attachments/assets/dc8d3b0b-0dbe-49c3-a2ed-6cb77ce3b2d4" />

Ce projet est le cœur du système **AIDE**. Il sert d'interface centrale (API) pour orchestrer les échanges entre une application utilisateur, un système embarqué et un moteur d'Intelligence Artificielle.

## 🧠 Rôle du Système

L'API agit comme un chef d'orchestre entre trois piliers :
1.  **L'Application :** Interface de contrôle et de visualisation pour l'utilisateur.
2.  **Le Système Embarqué :** Réception des commandes physiques et retour d'état en temps réel.
3.  **Le Serveur d'IA :** Gestionnaire de la **conversation**, de la reconnaissance vocale (**STT**) et de la synthèse vocale (**TTS**).

---

## 🛠 Architecture & Fonctionnalités

- 🔗 **Pont de Données :** Transmission fluide des instructions entre le hardware et le software.
- 🗣 **Gestion de la Voix :** Traitement des flux audio pour une interaction naturelle.
- 🤖 **Cerveau Conversationnel :** Analyse du contexte et génération de réponses intelligentes via l'IA.
- ⚡ **Temps Réel :** Communication optimisée pour une latence minimale.

---

## Installation
  1. **Prérequis**  
     Node.js (version 18.x ou + recommandée)  
     NPM (installé avec Node)  
     Ollama avec le modele Gemma3:1b
  
  3. **Récupération du projet**
  Clonez le dépôt sur votre machine :
     ```bash
     git clone https://github.com/FullJoss/AIDE-API.git
     cd Projet-AIDE
      ```
  
  4. **Installation des dépendances**
  Lancez la commande suivante pour installer tous les modules nécessaires :
     ```bash
     npm install
      ```
     
  5. **Lancement**
  Pour travailler sur le projet avec le rechargement automatique :
      ```bash
      npm start
      ```

## 📁 Structure du Projet

```text
Projet-AIDE/
├── routes/             # Points d'entrée de l'API
├── services/           # Logique séparer pour l'integrationt facile
├── controllers/        # Logique métier et traitement sur les routes
├── config/             # Configuration serveur et clés API
├── tests/              # Tests unitaires et d'intégration
├── .gitignore          # Fichiers exclus du versioning
└── package.json        # Dépendances Node.js
└── index.js            # Programme principale
