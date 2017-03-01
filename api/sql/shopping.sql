-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-10-26 03:46:51
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `prov` varchar(10) NOT NULL,
  `city` varchar(20) NOT NULL,
  `area` varchar(20) NOT NULL,
  `detail` varchar(500) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`id`, `uid`, `prov`, `city`, `area`, `detail`, `name`, `mobile`) VALUES
(1, 1, '110000', '110101', '110105', NULL, 'sss', '13000000000'),
(2, 1, '110000', '110101', '110105', NULL, 'sss', '13000000000'),
(3, 1, '110000', '110101', '110102', '十字路1222号', 'sss', '13000000000'),
(4, 1, '130000', '130600', '130683', '我也不知道这是哪', '某某', '15710002000');

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`id`, `uid`, `gid`, `count`) VALUES
(1, 1, 26, 5),
(3, 1, 22, 1),
(4, 1, 17, 1),
(7, 1, 21, 1),
(8, 2, 30, 1),
(9, 1, 30, 2);

-- --------------------------------------------------------

--
-- 表的结构 `classify`
--

CREATE TABLE `classify` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `classify`
--

INSERT INTO `classify` (`id`, `name`) VALUES
(1, '电子类'),
(2, '生活用品'),
(3, '食品类'),
(4, '图书类'),
(5, '文具');

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `details` varchar(500) NOT NULL,
  `amount` int(11) NOT NULL,
  `classify` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `pic` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `title`, `price`, `details`, `amount`, `classify`, `status`, `pic`) VALUES
(3, '11', 22, '33', 44, 0, 1, NULL),
(4, 'qq', 22, 'ee', 55, 0, 1, NULL),
(6, 'ww', 33, 'ff', 4, 4, 1, NULL),
(7, 'dell', 4000, '戴尔笔记本', 200, 0, 1, NULL),
(11, 'dd', 4, '订单', 6, 1, 1, NULL),
(16, '小米5', 2999, '小米发烧友', 666, 0, 1, NULL),
(17, '夏威夷果', 20, '三只松鼠', 1000, 2, 1, NULL),
(18, '水杯', 10, '富光', 1000, 3, 0, NULL),
(19, '耳钉', 33, 's925', 300, 3, 0, NULL),
(20, '11', 11, '11', 11, 0, 0, NULL),
(21, '扔出神烦', 999, '网络用语', 666, 2, 1, NULL),
(22, '反复', 444, '反反复复', 2, 2, 1, NULL),
(23, '擦擦擦', 44, '66', 77, 3, 1, NULL),
(24, 'skin79', 100, '柔肤水', 98, 2, 1, NULL),
(25, 'fppp', 55, '555', 55, 4, 0, NULL),
(26, '被子--南极人 夏被 亲肤柔软空调被 清凉夏被 奶白-深灰 150*200cm', 55, '夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，，夏凉被特别凉快冬暖夏凉，，夏凉被特别凉快冬暖夏凉', 300, 2, 1, '1476768504.1808.jpg'),
(27, 'ddd', 123, '123', 123, 4, 1, NULL),
(28, 'dddd12', 123, '123', 123, 4, 1, NULL),
(29, 'mmm', 123, '13', 1, 3, 1, NULL),
(30, 'loveMe', 29, '暖心著作', 12222, 2, 1, '1476768567.2284.com.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `goodsimage`
--

CREATE TABLE `goodsimage` (
  `id` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `gids` varchar(50) NOT NULL,
  `ctime` datetime NOT NULL,
  `status` varchar(50) NOT NULL,
  `addressId` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`id`, `gids`, `ctime`, `status`, `addressId`, `uid`) VALUES
(1, '24,26', '2016-10-12 11:32:59', '待发货', 4, 1),
(2, '26', '2016-10-13 09:42:20', '待发货', 4, 1),
(3, '26', '2016-10-13 09:42:33', '待发货', 4, 1),
(4, '17,26', '2016-10-13 10:33:29', '待发货', 3, 1),
(5, '17,22,26', '2016-10-13 10:34:44', '待发货', 3, 1),
(6, '22,17', '2016-10-15 02:09:50', '待发货', 3, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `type` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `mobile`, `type`, `status`) VALUES
(1, 'lily', '123', 'lily@126.com', '15000000000', 1, 1),
(2, 'Bob', '123', 'Bob@126.com', '15000000000', 9, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classify`
--
ALTER TABLE `classify`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goodsimage`
--
ALTER TABLE `goodsimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- 使用表AUTO_INCREMENT `classify`
--
ALTER TABLE `classify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- 使用表AUTO_INCREMENT `goodsimage`
--
ALTER TABLE `goodsimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
