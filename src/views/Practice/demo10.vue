<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="http://api_devs.wanxikeji.cn/api/saveFile"
    multiple
    :show-file-list="flag"
    :before-upload="beforeUpload"
    :limit="3"
    :on-success="handleSuccess"
    :on-change="handleChange"
  >
  <!-- :auto-upload="flag" -->
    <el-button type="primary">Click to upload</el-button>
  </el-upload>
  <div v-html="imgShow"></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile , UploadFile, UploadFiles} from 'element-plus'

const flag =false;
const fileList = ref<UploadUserFile[]>([]);
const imgShow = ref('');
const handleSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles)=>{
  console.log('Response',response);
  console.log('successFile',uploadFile);
  console.log('successFiles',uploadFiles);
  let str = 'http://api_devs.wanxikeji.cn/'+response.data;
  imgShow.value = `<img src='${str}' />`

}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // console.log(rawFile);
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const handleChange  = (uploadFile: UploadFile, uploadFiles: UploadFiles)=>{
  // console.log(uploadFile,uploadFiles);
}
</script>
