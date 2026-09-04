# 文档流
浏览器在渲染页面时，遵照从上往下、从左往右的顺序，依次排列，这种页面的排版方式就是文档流。

# 浮动布局
通常用法：将子元素浮动起来，实现并排布局

1. float: left; 浮动会导致元素脱离文档流，但是一定不会覆盖文字
    - 值只有left 或者 right，写top或者bottom实际会为none

2. 浮动元素导致父容器高度塌陷，进而会影响后续的容器排版

# 清除浮动带来的负面影响
1. 直接给父容器设置高度  --  不推荐
2. 在浮动元素的末尾增加一个空容器，设置 clear: both;  --  不推荐
3. 为父容器设置 after 伪元素，在伪元素上 clear: both; --  推荐
4. 被影响的元素设置 clear: both;  --  不推荐
5. 为父容器设置 overflow: hidden;  --  非常推荐

# BFC (block formating context)
1. 父子容器的 margin-top 会重叠

- BFC的渲染规测：
    1. BFC容器内部的子元素也是从上往下，从左往右排列
    2. BFC容器是一个独立的拥有特殊渲染规则的容器，它内部的 子元素 不会影响外部
    3. BFC容器在计算高度的时候，会将浮动的 子元素的高度 也计算在内

- 如何创建BFC容器：
    1. overflow: hidden || auto || overlay || scroll;
    2. position: absolute || fixed;
    3. float: left || right;
    4. display: flex || grid || inline-xxxx;
