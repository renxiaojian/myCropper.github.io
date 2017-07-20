/**
 * Created by Administrator on 2017/7/19.
 */
$(function () {

    var myCropper = function () {

        var $avatarInput = '',
            $image = $('.avatar-wrapper>img'),
            $avatarView = $('.avatar-view'),
            dataURL;
        var imgData,
            imgSize,
            imgType;
        $image.cropper({
            aspectRatio: 2,
            preview: '.avatar-preview',
            built: function () {
                imgData = $image.cropper('getImageData')
            }
        });

        // Import image
        var $inputImage = $('#avatarInput'),
            URL = window.URL || window.webkitURL,
            blobURL;
        if (URL) {
            $inputImage.change(function () {
                var files = this.files,
                    file;
                if (files && files.length) {
                    file = files[0];
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL); // Revoke when load complete
                    }).cropper('reset', true).cropper('replace', blobURL);
                }
                $('.avatar-info').html('');
                imgSize = file.size;
                $avatarInput = this.value;
                if($avatarInput){
                    if (/\.(png|PNG)$/.test($avatarInput)) {
                        imgType = 'image/png';
                        return false;
                    }else if(/\.(jpg|jpeg|JPG)$/.test($avatarInput)){
                        imgType = 'image/jpeg';
                        return false;
                    }
                }
            });
        } else {
            $inputImage.parent().remove();
        }
        //模态框
        var $Rmodal = $('.r-modal'),
            $RmodalBgMark = $('.r-modal-bgmark'),
            $RmodalDialog = $('.r-modal-dialog'),
            $close = $('.close');
        $close.click(function () {
            cleanCon('');
            modalHidePrivate();
        });

        $RmodalBgMark.click(function () {
            cleanCon('');
            modalHidePrivate();
        });

        //改变图片比例
        function changeAspectRatioP($proportion) {
            $image.cropper('setAspectRatio',$proportion);
        }

        //图片要求
        function judgePrivate($w,$h,$size,$p) {
            var photo = $image.cropper('getCroppedCanvas');
            var proportion = Math.floor((photo.width/photo.height)*100)/100;
            if(imgData.naturalWidth<$w || imgData.naturalHeight<$h){
                console.log('上传图片宽度必须大于'+$w+'px,高度必须大于'+$h+'px');
                cleanCon('上传图片宽度必须大于'+$w+'px,高度必须大于'+$h+'px')
            }else if(imgSize>$size){
                console.log('上传图片必须小于1MB');
                cleanCon('上传图片必须小于1MB')
            }else if(proportion!=$p){
                console.log('上传轮播图比例为'+$p+'，请选择该比例');
                cleanCon('上传轮播图比例为'+$p+'，请选择该比例')
            }else{
                $avatarView.empty().append(photo);
                var canvas = document.getElementsByTagName('canvas')[0];
                dataURL = canvas.toDataURL(imgType);
                cleanCon('');
                imgData = undefined;
                modalHidePrivate();
            }
        }
        //清空内容
        function cleanCon(str) {
            $avatarInput = '';
            $('#avatarInput').val('');
            $('.cropper-container').remove();
            $('.avatar-preview').empty();
            $('.avatar-info').html(str);
        }

        function modalHidePrivate() {
            $Rmodal.fadeOut(150).removeClass('in');
            $RmodalBgMark.removeClass('in');
            $RmodalDialog.removeClass('in');
        }

        function imgDataURL() {
            return dataURL;
        }
        //返回
        return {
            imgData:imgDataURL,
            modalShow:function modalShow() {
                $Rmodal.fadeIn(50).addClass('in');
                $RmodalBgMark.addClass('in');
                $RmodalDialog.addClass('in');
            },
            modalHide:modalHidePrivate(),
            judge:function ($w,$h,$size,$p) {
                if(imgData == undefined){
                    console.log('请上传您要剪裁的图片');
                    cleanCon('请上传您要剪裁的图片');
                }else{
                    judgePrivate($w,$h,$size,$p)
                }
            },
            changeAspectRatio:function ($p) {
                changeAspectRatioP($p)
            }
        };

    }();


    
    //点击弹出剪裁框
    $('.my-cropper').click(function () {
        myCropper.modalShow();
    });

    //上传剪裁图片按钮 =====  根据图片的宽高、大小和比例，可设置不同的按钮
    $('#upPicture').click(function () {
        myCropper.judge(900,480,1048576,2);
        var b = myCropper.imgData();
        // console.log(b);
    });

    //改变图片比例按钮
    $('.c').click(function () {
        myCropper.changeAspectRatio(6/2);
    });
});