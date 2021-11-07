import { createStore } from 'vuex'
export default createStore({
  state: {
    user: null,
    listUser: null,
    hasPlayer: true,
    isAvtiveNavBar: false,
    isScrollingMainpage: false,
    isScrollingSubMenu: false,
    isActivePopup: false,
    isActivePartner: false,
    audio: [null],
    currentSong: null,
    currentCategory: { 
      id: 0,
      isSinger: false,
      title: "Hip Hop Nổi Bật",
      listsinger: "Kanye West, Lil Nas X, Jack Harlow...",
      imagecal: "/image/section/carousel1/image0.jpg"
    },
    tempSong: null,
    arraySong: null,
    arrayBanner: null,
    eventData: null,
    favoriteData: null,
    partnerData: null,
    isPlaying: false,
    isLooping: false,
    isMuted: false,
    navlinks: [
      {
        id: 0,
        title: 'Cá nhân',
        storeName:'About',
        iconClass: 'ic-24-LibraryTab'
      },
      {
        id: 1,
        title: 'Khám Phá',
        storeName:'Khampha',
        iconClass: 'ic-24-HomeTab'
      },
      {
        id: 2,
        title: '#zingchart',
        storeName:'Zingchart',
        iconClass: 'ic-24-ChartTab'
      },
      {
        id: 3,
        title: 'Radio',
        storeName:'Radio',
        iconClass: 'ic-24-RadioTab'
      },
      {
        id: 4,
        title: 'Theo Dõi',
        storeName:'Follow',
        iconClass: 'ic-24-FeedTab'
      }
    ],
    navlinksSub: [
      {
        id: 5,
        title: 'Nhạc Mới',
        storeName:'Newsongs',
        iconClass: 'ic-24-NewReleaseTab'
      },
      {
        id: 6,
        title: 'Thể Loại',
        storeName:'Category',
        iconClass: 'ic-24-GenreTab'
      },
      {
        id: 7,
        title: 'Top 100',
        storeName:'Top100',
        iconClass: 'ic-24-Top100Tab'
      },
      {
        id: 8,
        title: 'MV',
        storeName:'Mv',
        iconClass: 'ic-24-MVTab'
      }
    ],
    personalLinks: [
      {
        id: 1,
        title: 'BÀI HÁT',
        name: 'Mysong'
      },
      {
        id: 2,
        title: 'PLAYLIST',
        name: 'Myplaylist'
      },
      {
        id: 3,
        title: 'NGHỆ SĨ',
        name: 'Mysinger'
      },
      {
        id: 4,
        title: 'ANLBUM',
        name: 'Myanlbum'
      },
      {
        id: 5,
        title: 'TẢI LÊN',
        name: 'Myuploaded'
      }
    ]
  },
  mutations: {
    ChangeNavbarWidth(state) {
      // console.log("Before: ", state.isAvtiveNavBar);
      state.isAvtiveNavBar = !state.isAvtiveNavBar;
      // console.log("After hit the button: ", state.isAvtiveNavBar);
    },
    checkScrllMainpPage(state, scrollValue) {
      if(scrollValue > 20) {
        state.isScrollingMainpage = true;
      } else {
        state.isScrollingMainpage = false;
      }
    },
    checkScrllSubMenu(state, scrollValue) {
      if(scrollValue > 5) {
        state.isScrollingSubMenu = true;
      } else {
        state.isScrollingSubMenu = false;
      }
    },
    //fetching handle
    fetchingSongs(state, data) {
      state.arraySong = data;
      state.currentSong = data[0];
    },
    fetchingBanner(state, data) {
      state.arrayBanner = data;
    },
    fetchingEvent(state, data) {
      state.eventData = data;
    },
    fetchingUser(state, data) {
      state.user = data[0];
      state.listUser = data;
    },
    fetchingFavorite(state, data) {
      state.favoriteData = data
    },
    fetchingPartner(state, data) {
      state.partnerData = data
    },
    //End fetching handle
    updateCurrentSong(state){
      if (state.currentSong != state.tempSong) {
        state.currentSong = state.tempSong;
        state.isPlaying = true;
      } 
      state.isActivePopup = false;
      state.hasPlayer = true;
    },
    updateCurrentCategory(state, category) {
      state.currentCategory = category;
    },
    updateTempSong(state, index) {
      state.tempSong = state.arraySong[index];
    },
    //handle popup
    togglePopup(state, index) {
      state.isActivePopup = !state.isActivePopup;
      state.tempSong = state.arraySong[index];
    },
    togglePartnerPopup(state) {
      state.isActivePartner = !state.isActivePartner
    },
    //handle music
    togglePlayMusic(state) {
      if (!state.isPlaying) {
        state.audio[0].play();
      } else {
        state.audio[0].pause();
      }
    },
    onPlayingAudio(state) {
      state.isPlaying = true;
    },
    onPauseAudio(state) {
      state.isPlaying = false;
    },
    onEndAudio(state) {
      if (state.isLooping) {
        state.audio[0].play();
      }
    },
    //handle tools player
    toggleLoop(state) {
      state.isLooping = !state.isLooping;
    }
  },
  actions: {
    getSongApi(context) {
      // fetching data
      fetch("/data/songs.json")
      .then(respone => respone.json())
      .then(data => {
          context.commit("fetchingSongs", data);
      })
    },

    getBannerApi(context) {
      // fetching data
      fetch("/data/banner.json")
      .then(respone => respone.json())
      .then(data => {
          context.commit("fetchingBanner", data);
      })
    },

    getEventApi(context) {
      // fetching data
      fetch("/data/event.json")
      .then(respone => respone.json())
      .then(data => {
          context.commit("fetchingEvent", data);
      })
    },

    getUserApi(context) {
      fetch("/data/users.json")
      .then(respone => respone.json())
      .then(data => {
        context.commit("fetchingUser", data)
      })
    },

    getFavoriteApi(context) {
      fetch("/data/favorite.json")
      .then(respone => respone.json())
      .then(data => {
        context.commit("fetchingFavorite", data)
      })
    },

    getPartnerApi(context) {
      fetch("/data/partner.json")
      .then(respone => respone.json())
      .then(data => {
        context.commit("fetchingPartner", data)
      })
    }
  },
  getters: {

  },
  modules: {
  }
})
