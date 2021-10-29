import { createStore } from 'vuex'
export default createStore({
  state: {
    hasPlayer: false,
    isAvtiveNavBar: false,
    isScrollingMainpage: false,
    isScrollingSubMenu: false,
    isActivePopup: false,
    audio: [null],
    currentSong: null,
    currentCategory: { 
      id: 0,
      isSinger: false,
      title: "Hip Hop Nổi Bật",
      listsinger: "Kanye West, Lil Nas X, Jack Harlow...",
      image: "/image/section/carousel1/image0.jpg"
    },
    tempSong: null,
    arraySong: null,
    isPlaying: false,
    isLooping: false,
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
    ],
    carousellist: [
      { 
        id: 0,
        isSinger: false,
        title: "Hip Hop Nổi Bật",
        listsinger: "Kanye West, Lil Nas X, Jack Harlow...",
        image: "/image/section/carousel1/image0.jpg",
        subImage: "/image/section/singer/image0.jpg"
      },
      { 
        id: 1,
        isSinger: false,
        title: "Rap Việt ngày nay",
        listsinger: "Tuimi, 16 Typh, MCK...",
        image: "/image/section/carousel1/image1.jpg",
        subImage: "/image/section/singer/image1.jpg"
      },
      { 
        id: 2,
        isSinger: true,
        title: "B Ray",
        listsinger: "",
        image: "/image/section/carousel1/image2.jpg",
        subImage: "/image/section/singer/image2.jpg"
      },
      { 
        id: 3,
        isSinger: false,
        title: "Góc nhạc Hoàng Dũng",
        listsinger: "Hoàng Dũng",
        image: "/image/section/carousel1/image3.jfif",
        subImage: "/image/section/singer/image3.jpg"
      },
      { 
        id: 4,
        isSinger: false,
        title: "Góc nhạc Justin Bieber",
        listsinger: "Justin Bieber",
        image: "/image/section/carousel1/image4.jfif",
        subImage: "/image/section/singer/image4.jpg"
      },
      { 
        id: 5,
        isSinger: true,
        title: "Tuấn Hưng",
        listsinger: "",
        image: "/image/section/carousel1/image5.jpg",
        subImage: "/image/section/singer/image5.jpg"
      },
      { 
        id: 6,
        isSinger: true,
        title: "Tlinh",
        listsinger: "",
        image: "/image/section/carousel1/image6.jpg",
        subImage: "/image/section/singer/image6.jpg"
      },
      { 
        id: 7,
        isSinger: false,
        title: "Nhạc hàn tháng 9",
        listsinger: "HYUNA, Mamamoo, LISA...",
        image: "/image/section/carousel1/image7.jpg",
        subImage: "/image/section/singer/image7.jpg"
      },
      { 
        id: 8,
        isSinger: false,
        title: "Top 100 Nhạc trữ tình",
        listsinger: "Phi Nhung, Anh Thơ, Trọng Tấn...",
        image: "/image/section/carousel1/image8.jpg",
        subImage: "/image/section/singer/image8.jpg"
      },
      { 
        id: 9,
        isSinger: false,
        title: "Giọng ca Nổi Bật",
        listsinger: "An An, Hoàng Tôn, Đức Phúc...",
        image: "/image/section/carousel1/image9.jpg",
        subImage: "/image/section/singer/image9.jpg"
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
    fetchingSongs(state, data) {
      state.arraySong = data;
      state.currentSong = data[0];
    },
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
    },
  },
  actions: {
    getSongApi(context) {
      // fetching data
      fetch("/data/songs.json")
      .then(respone => respone.json())
      .then(data => {
          context.commit("fetchingSongs", data);
      })
    }
  },
  getters: {

  },
  modules: {
  }
})
