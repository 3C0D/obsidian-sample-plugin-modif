import {
  App,
  Plugin,
  PluginSettingTab,
  Setting,
  Notice
} from "obsidian";
import { GenericConfirmModal } from "./common/generic-confirm-modal.js";
// Import from centralized configuration (simulated for demo)
import { showCentralizedModal } from "./common/centralized-modal.js";
// Import centralized tools - COMMENTED FOR AUTONOMOUS VERSION
// import { showTestMessage, getRandomEmoji } from "obsidian-plugin-config/tools";

// Remember to rename these classes and interfaces

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default"
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload(): Promise<void> {
    console.log("loading plugin");
    await this.loadSettings();

    // Ajouter une commande pour tester le modal de confirmation local
    this.addCommand({
      id: 'show-confirmation-modal',
      name: 'Show Confirmation Modal (Local)',
      callback: () => this.showConfirmationModal()
    });

    // Ajouter une commande pour tester le modal de confirmation centralisé
    this.addCommand({
      id: 'show-centralized-modal',
      name: 'Show Confirmation Modal (Centralized)',
      callback: () => this.showCentralizedModal()
    });

    // Test centralized tools - COMMENTED FOR AUTONOMOUS VERSION
    /*
    this.addCommand({
      id: 'test-centralized-tools',
      name: 'Test Centralized Tools',
      callback: () => {
        const message = showTestMessage();
        const emoji = getRandomEmoji();
        new Notice(`${emoji} ${message}`);
      }
    });
    */

    this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  /**
   * Affiche un modal de confirmation pour tester la fonctionnalité
   */
  private showConfirmationModal(): void {
    const modal = new GenericConfirmModal(
      this.app,
      "Confirmation requise",
      [
        "Êtes-vous sûr de vouloir effectuer cette action ?",
        "Cette action ne peut pas être annulée."
      ],
      "Confirmer",
      "Annuler",
      (confirmed: boolean) => {
        if (confirmed) {
          new Notice("Action confirmée !");
          console.log("Action confirmée par l'utilisateur");
        } else {
          new Notice("Action annulée.");
          console.log("Action annulée par l'utilisateur");
        }
      }
    );

    modal.open();
  }

  /**
   * Affiche un modal de confirmation depuis la configuration centralisée
   */
  private showCentralizedModal(): void {
    showCentralizedModal(this.app, {
      title: "Centralized Modal Test",
      message: "This modal comes from the centralized configuration! Pretty cool, right?",
      confirmText: "Awesome!",
      cancelText: "Not bad",
      onConfirm: () => {
        new Notice("Centralized modal confirmed! 🎉");
      },
      onCancel: () => {
        new Notice("Centralized modal cancelled 😢");
      }
    });
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl);
  }
}
