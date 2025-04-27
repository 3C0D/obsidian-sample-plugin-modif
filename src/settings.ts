/**
 * Settings definitions for the plugin
 */

/**
 * Interface for confirmation modal settings
 */
export interface ConfirmModalSettings {
    title: string;
    messages: string[];
    confirmButtonText: string;
    cancelButtonText: string;
    confirmNotice: string;
    cancelNotice: string;
}

/**
 * Interface for plugin settings
 */
export interface PluginSettings {
    // General settings
    mySetting: string;
    
    // Feature settings
    confirmModal: ConfirmModalSettings;
    
    // Feature toggles
    enabledFeatures: {
        confirmModal: boolean;
    };
}

/**
 * Default settings for the plugin
 */
export const DEFAULT_SETTINGS: PluginSettings = {
    // General settings
    mySetting: "default",
    
    // Feature settings
    confirmModal: {
        title: "Confirmation Required",
        messages: [
            "Are you sure you want to perform this action?",
            "This action cannot be undone."
        ],
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmNotice: "Action confirmed!",
        cancelNotice: "Action cancelled."
    },
    
    // Feature toggles
    enabledFeatures: {
        confirmModal: true
    }
};
