import {
  App,
  Plugin,
  PluginSettingTab,
  Setting,
  Notice
} from "obsidian";
import { GenericConfirmModal } from "./common/generic-confirm-modal.js";

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

    // Ajouter une commande pour tester le modal de confirmation
    this.addCommand({
      id: 'show-confirmation-modal',
      name: 'Show Confirmation Modal',
      callback: () => this.showConfirmationModal()
    });

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
