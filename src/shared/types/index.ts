export interface IArea {
    id?: string;
    description: string;
    lat: number;
    lng: number;
    radius: number;
    viewMap?: boolean;
}

export interface IPoint {
    id?: string;
    description: string;
    lat: number;
    lng: number;
    viewMap?: boolean;
}

export interface IPerimeter {
    id?: string;
    description: string;
    viewMap?: boolean;
    initial: {
        lat: number;
        lng: number;
    }
    final: {
        lat: number;
        lng: number;
    }
}

