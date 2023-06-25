export default {
    namespaced: true,
    state: {
        categories: [
            {
                title: "Футбол",
                imgUrl: "https://cdn5.idcgames.com/storage/image/1250/game_home_bg_section_2/default.jpg",
                slug: "football",
            },
            {
                title: "Баскетбол",
                imgUrl: "https://imengine.prod.srp.navigacloud.com/?uuid=0A7D45A7-EFB0-4EFA-B158-C0C8E05C192E&type=primary&q=72&width=1200",
                slug: "basketball",
            },
            {
                title: "Волейбол",
                imgUrl: "https://cdn.vox-cdn.com/thumbor/xPaZZJjNtTuz4ki5KN3Q2G3xRWE=/1400x788/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/22144753/Hinata11.png",
                slug: "volleyball",
            },
            {
                title: "Хоккей",
                imgUrl: "https://i.pinimg.com/564x/af/69/3a/af693af6aace3bf7a96f1c400ccd2e67.jpg",
                slug: "hockey",
            },
            {
                title: "Настольный теннис",
                imgUrl: "https://i.pinimg.com/736x/f9/b3/bd/f9b3bd476bad909e33bdbd2503765220.jpg",
                slug: "table-tennis",
            },
            {
                title: "Большой теннис",
                imgUrl: "https://static1.straitstimes.com.sg/s3fs-public/styles/large30x20/public/articles/2023/01/20/10416842_1.jpg?VersionId=UVqVz6JE2eE32N2.BsqFlDVdyk8Ajm.f",
                slug: "tennis",
            },
            {
                title: "Ходьба на горы",
                imgUrl: "https://i.guim.co.uk/img/media/e994bb7ab8b900b70a4ac07026f85ba6ac06e25e/0_248_7360_4415/master/7360.jpg?width=1200&quality=85&auto=format&fit=max&s=775e8347a5a62a6d5bef19bd670bc3ba",
                slug: "mountain-walking",
            },
            {
                title: "Гонка на машинах",
                imgUrl: "https://www.fia.com/sites/default/files/styles/content_details/public/news/main_image/image16.jpg?itok=ox8xJ20d",
                slug: "car-racing",
            },
        ],
    },
    getters: {
        getCategories: state => state.categories,
        getCategoryBySlug: state => slug => state.categories.find(c => c.slug === slug),
    },
};
