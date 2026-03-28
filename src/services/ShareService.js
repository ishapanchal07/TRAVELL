import { Share, Platform } from 'react-native';

/**
 * Service to handle native sharing across the application.
 */
export default class ShareService {
    /**
     * Share an item's content.
     * @param {Object} itemData - Data of the item to share.
     * @param {string} itemData.title - Title or name of the item.
     * @param {string} [itemData.description] - Short description (optional).
     * @param {string} [itemData.image] - Image link (optional).
     * @param {string} [itemData.url] - Direct link (optional).
     * @param {string} [appName='Roamster'] - Name of the app to display.
     */
    static async shareItem({ title, description, image, url }, appName = 'Roamster') {
        try {
            const shareTitle = title || 'Check this out';
            let message = `Check out this ${title} on ${appName}!`;
            
            if (description) {
                message += `\n\n${description}`;
            }

            const shareLink = url || image;
            if (shareLink) {
                // On Android, the URL should be part of the message string
                if (Platform.OS === 'android') {
                    message += `\n\nLink: ${shareLink}`;
                }
            }

            const result = await Share.share({
                title: shareTitle,
                message: message,
                url: shareLink // This property works on iOS
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing through ShareService:', error.message);
        }
    }
}
