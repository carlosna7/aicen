import { DatabaseItem } from "./tipesDatabase";

export interface ImageCardProps {
    item: DatabaseItem
}

export interface ImageCardMatchProps {
    item: DatabaseItem
    score: number
}