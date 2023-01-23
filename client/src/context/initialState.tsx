interface Isong {
    name: string,
    imageUrl: string,
    songURL: string,
    album: string,
    artist: string,
    language: string,
    category:string,
    twitter: string,
    instagram: string,
    user_id: string,
    email_verified: boolean,
    role: string,
    auth_time: string
}

// interface InitialState {
//     user: null,
//     allUsers: null ,
//     allSongs: null,
//     // allSongs: null | Isong[],
//     allArtist: null,
//     allAlbums: null,
//     filterTerm: "all",
//     artistFilter: null,
//     languageFilter: null,
//     albumFilter: null, 
//     alertType: null,
//     isSongPlaying: true,
//     songIndex: 
// }

export const initialState = {
    user: null,
    allUsers: null,
    allSongs: null,
    // allSongs: null | Isong[],
    allArtist: null,
    allAlbums: null,
    filterTerm: "all",
    artistFilter: null,
    languageFilter: null,
    albumFilter: null, 
    alertType: null,
    isSongPlaying: false,
    songIndex: 0,
}