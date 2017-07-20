> ##基于Cropper插件，封装自己的myCropper
>> ### 1.业务需求
>> * 图片剪裁工具，并上传剪裁后的图片
>> * 限制图片的宽、高、大小、比例
>> * 可改变剪裁框的比例
>> * 一个页面中可存在多个图片裁剪框，并且互不影响
>> ### 2.问题及解决
>> 1. cropper插件的案例中引用了Bootstrap的样式，为了一个插件去引入Bootstrap，这样增加了网页的CSS,JS代码，影响网页性能，并且可移植性并不好。

>>     解决：把需要的样式提取出来，建立自己的myCropper.css文件。
>> 2. cropper有着强大功能，但是根据业务需求，我们只需要抽取需要的功能即可。

>>     解决：（1)改变裁剪框大小；（2）限制图片；（3）模拟模态框；(4)myCropper.js

>> ### 3.使用myCropper
>>> 3.1 引入必要的CSS和JS
>>> 
	<link rel="stylesheet" href="./dist/cropper.css">
    <link rel="stylesheet" href="./dist/myCropper.css">
>>>
	<script src="assets/js/jquery.min.js"></script>
    <script src="./dist/cropper.js"></script>
	<script src="./dist/myCropper.js"></script>
>>> 3.2 HTML代码
>>>
	**点击按钮，弹出剪裁框，并且完成上传之后的图片会添加到.avatar-view中**
	<div class="my-cropper">
        <div class="avatar-view"></div>
    </div>
>>>
	**模拟模态框，图片上传。**
    <div class="r-modal fade" style="display: none;">
        <div class="r-modal-bgmark fade"></div>
        <div class="r-modal-dialog">
            <div class="r-modal-content">
                <div class="r-modal-header">
                    <button class="close" type="button">×</button>
                    <h4 class="r-modal-tit">Change Avatar 图片剪裁并上传</h4>
                </div>
                <div class="r-modal-body">
                    <div class="avatar-body">
                        <!-- Upload image and data -->
                        <div class="avatar-upload">
                            <input class="avatar-src" name="avatar_src" type="hidden">
                            <input class="avatar-data" name="avatar_data" type="hidden">
                            <label for="avatarInput">Local upload</label>
                            <input class="avatar-input" id="avatarInput" name="avatar_file" type="file">
                        </div>
                        <!-- Crop and preview -->
                        <div class="avatar-cp clearfix">
                            <div class="avatar-left">
                                <div class="avatar-wrapper">
                                    <img src="" alt="">
                                </div>
                            </div>
                            <div class="avatar-right">
                                <div class="avatar-preview preview-lg"></div>
                                <div class="avatar-preview preview-md"></div>
                                <div class="avatar-preview preview-sm"></div>
                            </div>
                        </div>
                        <!--info-->
                        <div class="avatar-info"></div>
                        <!--btn-->
                        <div class="avatar-ib clearfix">
                            <div class="avatar-left"></div>
                            <div class="avatar-right">
                                <button class="r-btn r-btn-primary avatar-up" id="upPicture" type="button">up picture</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
>>> 3.3 myCropper.js中的方法

>>>  * myCropper.modalShow(); //模态框弹出
>>>  * myCropper.modalHide(); //模态框隐藏
>>>  * myCropper.imgData();   //获取图片BASE64编码
>>>  * myCropper.judge($w,$h,$size,$p)

>>>      $w    =>图片宽（大于此值）       $h    =>图片高（大于此值）
>
>>>      $size    =>图片大小（B小于此值） $p    =>图片比例（等于此值）
>>>  * myCropper.changeAspectRatio(&p);
    
	