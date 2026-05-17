export interface DiaryEntry {
    id: string;
    username: string;
    title: string;
    content: string;
    for?:[Date,Date]; // [start_date, end_date]
    created_at?: Date;
    media?:[
        photos?:[
            photo:{
                id:string,
            url: string;
            caption?: string;
            width?: number; // Original width of the photo
            height?: number; // Original height of the photo
            x?: number; // X coordinate for photo placement in the diary entry
            y?: number; // Y coordinate for photo placement in the diary entry
        }], // Array of photo URLs
        videos?:[video:{
            id:string,
            url: string;
            caption?: string;
            thumbnail_url?: string; // URL for video thumbnail
            duration?: number; // Duration of the video in seconds
            width?: number; // Original width of the video
            height?: number; // Original height of the video
            x?: number; // X coordinate for video placement in the diary entry
            y?: number; // Y coordinate for video placement in the diary entry

        }], // Array of video URLs
        audios?: [audio:{
            id:string,
            url: string;
            caption?: string;
            duration?: number; // Duration of the audio in seconds
            x?: number; // X coordinate for audio placement in the diary entry
            y?: number; // Y coordinate for audio placement in the diary entry
        }]
    ]; // Array of media URLs (images, videos, etc.)
    mentions?: [string]; // Array of usernames mentioned in the diary entry
    tags?: [string]; // Array of tags associated with the diary entry
    mood?: "happy" | "sad" | "angry" | "excited" | "neutral"; // Mood associated with the diary entry
}