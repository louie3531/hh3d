// Dữ liệu phim hoạt hình Trung Quốc
const movieData = {
  // Tiên Ngịch
  "tien-ngich": {
    id: "tien-ngich",
    title: "Tiên Ngịch",
    originalTitle: "Immortal Samsara",
    year: "2022",
    description:
      "Khi thần tiên tan biến, thần sơn băng hà, thiếu nữ Chúc Tử Quyên rơi xuống phàm trần, xuyên qua mười vạn năm, vì một mối duyên sâu đậm. Một cái trọng sinh đã thay đổi vận mệnh của Thanh Khâu, nhưng Tử Quyên lại bắt đầu một cuộc hành trình trả thù và cứu chuộc.",
    genre: ["Tiên Hiệp", "Tình Cảm", "Cổ Trang"],
    episodes: 89,
    status: "Đang cập nhật",
    rating: "9.3",
    type: "series",
    poster: "https://yanhh3d.vip/storage/movies/tien-nghich-1737888520.jpg",
    backdrop:
      "https://scontent-sin11-1.xx.fbcdn.net/v/t39.30808-6/499227779_122219728628187414_692354975597694047_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHQOblryPhgXmj8KK48Wpldg1Up8hH0oBeDVSnyEfSgF7A8g1Of4Ev5JisE_sd_9WyBrGjRIluwphJ0kau5rRwd&_nc_ohc=s0luWXB9SGkQ7kNvwGpX3Dd&_nc_oc=Adldg_PpzALlyEZqv3OZ0Q7enEQNvbuR4GAbkzXhX4g1rfR2Zv3JnWjvA88YQbP-oemK3TdiQQjKEVxRgdijvaJa&_nc_zt=23&_nc_ht=scontent-sin11-1.xx&_nc_gid=LPZmT8EqSSQBi0Z4MaRV8g&oh=00_AfIK_sQO7DUP-0T-aWE0t8tZ3_0lhjeHBLSCFaUdvvqGmQ&oe=68326AD4",
  },

  // Đấu Phá Thương Khung
  "dau-pha-thuong-khung": {
    id: "dau-pha-thuong-khung",
    title: "Đấu Phá Thương Khung",
    originalTitle: "Battle Through the Heavens",
    year: "2018",
    description:
      "Đấu Phá Thương Khung kể về câu chuyện một thiên tài tu luyện Tiêu Viêm vì một lý do nào đó bị mất đi tu vi của mình, từ một thiên chi kiêu tử trở thành một kẻ bị mọi người coi thường. Tiêu Viêm quyết tâm lấy lại những gì thuộc về mình, đúng lúc đó trong chiếc nhẫn trên tay cậu có một linh hồn Dược Lão xuất hiện, từ đây cuộc sống của cậu hoàn toàn thay đổi.",
    genre: ["Huyền Huyễn", "Võ Thuật", "Phiêu Lưu"],
    episodes: 147,
    status: "Đang cập nhật",
    rating: "9.0",
    type: "series",
    poster:
      "https://yanhh3d.vip/storage/movies/dau-pha-thuong-khung-phan-5-6-1737297719.jpg",
    backdrop: "https://i.imgur.com/M5ycOn9.jpg",
  },

  // Vũ Động Càn Khôn
  "vu-dong-can-khon": {
    id: "vu-dong-can-khon",
    title: "Vũ Động Càn Khôn",
    originalTitle: "Martial Universe",
    year: "2019",
    description:
      "Vũ Động Càn Khôn kể về câu chuyện thiếu niên Lâm Động có được một chiếc nhẫn không gian trong một cuộc đấu giá. Từ đây cuộc sống của cậu có nhiều thay đổi, cậu gặp được người thầy thần bí Dao Trần và được hắn truyền thụ võ học, giúp cậu mạnh lên từng ngày.",
    genre: ["Huyền Huyễn", "Võ Thuật", "Phiêu Lưu"],
    episodes: 48,
    status: "Hoàn thành",
    rating: "8.7",
    type: "series",
    poster: "https://i.imgur.com/f3Yvvp5.jpg",
    backdrop: "https://i.imgur.com/zylq8s3.jpg",
  },

  // Thế Giới Hoàn Mỹ
  "the-gioi-hoan-my": {
    id: "the-gioi-hoan-my",
    title: "Thế Giới Hoàn Mỹ",
    originalTitle: "Perfect World",
    year: "2021",
    description:
      "Thế Giới Hoàn Mỹ kể về hành trình tu luyện của Thạch Hạo, một chàng trai mang trong mình sứ mệnh khôi phục vinh quang cho gia tộc. Cậu sẽ phải đối mặt với nhiều thế lực mạnh mẽ và nguy hiểm, nhưng cũng sẽ tìm được những người bạn đồng hành trung thành.",
    genre: ["Tiên Hiệp", "Võ Thuật", "Huyền Huyễn"],
    episodes: 60,
    status: "Đang cập nhật",
    rating: "8.8",
    type: "series",
    poster:
      "https://yanhh3d.vip/storage/movies/the-gioi-hoan-my-1743081184.jpg",
    backdrop: "https://i.imgur.com/dU1lHmx.jpg",
  },

  // Phàm Nhân Tu Tiên
  "pham-nhan-tu-tien": {
    id: "pham-nhan-tu-tien",
    title: "Phàm Nhân Tu Tiên",
    originalTitle: "A Mortal's Journey to Immortality",
    year: "2020",
    description:
      "Phàm Nhân Tu Tiên kể về hành trình của Hàn Lập, một thanh niên bình thường nhưng may mắn được học võ công và lĩnh hội bí kíp tu tiên. Dù bản thân không phải là thiên tài, nhưng với sự chăm chỉ và kiên trì, cùng với cơ duyên, Hàn Lập dần dần bước vào con đường tu tiên và trở nên mạnh mẽ.",
    genre: ["Tiên Hiệp", "Võ Thuật", "Huyền Huyễn"],
    episodes: 143,
    status: "Đang cập nhật",
    rating: "9.2",
    type: "series",
    poster:
      "https://yanhh3d.vip/storage/movies/pham-nhan-tu-tien-full-1742880727.jpg",
    backdrop: "https://i.imgur.com/8uIscjT.jpg",
  },

  // Già Thiên
  "gia-thien": {
    id: "gia-thien",
    title: "Già Thiên",
    originalTitle: "Shrouding the Heavens",
    year: "2022",
    description:
      "Già Thiên là câu chuyện về một thanh niên tưởng chừng như bình thường nhưng lại mang trong mình một bí mật lớn. Khi các thế lực trong thiên hạ tranh đoạt bảo vật, anh vô tình trở thành mục tiêu của mọi người. Trên con đường chiến đấu và sinh tồn, anh dần khám phá ra sức mạnh tiềm ẩn của bản thân.",
    genre: ["Tiên Hiệp", "Võ Thuật", "Phiêu Lưu"],
    episodes: 26,
    status: "Đang cập nhật",
    rating: "8.7",
    type: "series",
    poster: "https://yanhh3d.vip/storage/movies/gia-thien-1740538030.jpg",
    backdrop: "https://i.imgur.com/Vx6VM3A.jpg",
  },

  // Thôn Phệ Tinh Không
  "thon-phe-tinh-khong": {
    id: "thon-phe-tinh-khong",
    title: "Thôn Phệ Tinh Không",
    originalTitle: "Swallowed Star",
    year: "2020",
    description:
      "Thôn Phệ Tinh Không là câu chuyện về một thế giới tương lai, nơi nhân loại phải đối mặt với sự xuất hiện của các quái vật đột biến. Lạc Phong, một chàng trai bình thường bỗng có được cơ duyên đặc biệt, trở thành một trong những chiến binh mạnh mẽ, bảo vệ nhân loại và khám phá những bí ẩn về vũ trụ.",
    genre: ["Huyền Huyễn", "Viễn Tưởng", "Võ Thuật"],
    episodes: 172,
    status: "Đang cập nhật",
    rating: "8.9",
    type: "series",
    poster:
      "https://yanhh3d.vip/storage/movies/thon-phe-tinh-khong-1737366995.jpg",
    backdrop:
      "https://scontent-sin2-3.xx.fbcdn.net/v/t39.30808-6/474136276_1152777956504908_4965294675724759599_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yxPeNepEWs8Q7kNvwGuIFZJ&_nc_oc=AdmZLfmLE3Dp98suDzXQBK4kTYLZAf6vS8SZnhVqPuZZJkEJV1pmQJFRCK-L01F7xlBWjwmmiWQw7Yi_67WO2uHj&_nc_zt=23&_nc_ht=scontent-sin2-3.xx&_nc_gid=rotkkamXpDuboVZiYn_UIA&oh=00_AfLouRvvErTeRCnxQ7WkGHn6usDKaAFs73gkTSh_lhzcGA&oe=68326A8F",
  },

  // Kiếm Lai
  "kiem-lai": {
    id: "kiem-lai",
    title: "Kiếm Lai",
    originalTitle: "Sword Coming",
    year: "2022",
    description:
      "Kiếm Lai kể về câu chuyện của một thanh niên có duyên với kiếm đạo, trải qua nhiều khó khăn và thử thách để trưởng thành và trở thành một kiếm khách xuất chúng. Trên hành trình đó, anh gặp nhiều người bạn, kẻ thù và dần khám phá ra bí mật về thân thế của mình.",
    genre: ["Võ Thuật", "Tiên Hiệp", "Cổ Trang"],
    episodes: 40,
    status: "Hoàn thành",
    rating: "8.5",
    type: "series",
    poster: "https://yanhh3d.vip/storage/movies/kiem-lai.webp",
    backdrop: "https://i.imgur.com/M5ycOn9.jpg",
  },

  // Mẫu phim
  "mau-phim": {
    id: "mau-phim",
    title: "Mẫu phim",
    originalTitle: "Template Movie",
    year: "202X",
    description:
      "Đây là mẫu để thêm phim mới, vui lòng thay thế tất cả thông tin.",
    genre: ["Thể loại 1", "Thể loại 2"],
    episodes: 10,
    status: "Đang cập nhật",
    rating: "0.0",
    type: "series",
    poster: "https://placehold.co/300x450?text=Poster",
    backdrop: "https://placehold.co/1920x1080?text=Backdrop",
  },

  // Thêm phim mới ở đây, nhớ thêm dấu phẩy sau mỗi đối tượng phim
};

// Nếu bạn muốn xuất dữ liệu phim trong môi trường module
if (typeof module !== "undefined") {
  module.exports = { movieData };
}
