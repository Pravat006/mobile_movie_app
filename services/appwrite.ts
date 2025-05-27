//track searches made by user
import Constants from "expo-constants";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = Constants.expoConfig?.extra?.APPWRITE_DB_COLLECTION_ID!;
const ENDPOINT = Constants.expoConfig?.extra?.APPWRITE_ENDPOINT!;
const PROJECT_ID = Constants.expoConfig?.extra?.APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        console.log("=== updateSearchCount Debug ===");
        console.log("Query:", query);
        console.log("Movie data:", JSON.stringify(movie, null, 2));
        console.log("DATABASE_ID:", DATABASE_ID);
        console.log("COLLECTION_ID:", COLLECTION_ID);

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);

        console.log("Search result:", JSON.stringify(result, null, 2));
        console.log("Documents found:", result.documents.length);
        5
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            console.log("Found existing document:", JSON.stringify(existingMovie, null, 2));

            const updatedDoc = await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            );
            // console.log("Successfully updated document:", JSON.stringify(updatedDoc, null, 2));
        } else {
            // console.log("No existing document found. Creating new one...");

            const newDocumentData = {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
            };

            // console.log("New document data:", JSON.stringify(newDocumentData, null, 2));

            const newDocument = await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                newDocumentData
            );
            // console.log("Successfully created new document:", JSON.stringify(newDocument, null, 2));
        }
        console.log("=== updateSearchCount Complete ===");
    } catch (error) {
        console.error("=== updateSearchCount Error ===");
        console.error("Error type:", typeof error);
        // console.error("Error message:", error?.message);
        // console.error("Error code:", error?.code);
        console.error("Full error:", JSON.stringify(error, null, 2));
        console.error("================================");

        // Don't throw the error to prevent app crashes
        // throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(5)
        ]);
        console.log("trending movies", result);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log("get trending movies error: ", error);
        throw error;
    }
}


