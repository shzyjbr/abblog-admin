<template>
  <div class="container">
    <div class="left-pane">
      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>URL:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="url" placeholder="input url here..." :rows="2" type="textarea" clearable />
        </el-col>
      </el-row>
      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Http Method:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="httpMethod" class="m-2" placeholder="Select Http Method" size="large" style="width: 240px">
            <el-option v-for="item in methodOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Content-Type:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-select v-model="contentType" class="m-2" placeholder="Select Content Type" size="large" style="width: 240px">
            <el-option v-for="item in contentTypeOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="m-5" v-show="showRequestBodyArea">
        <el-col :span="4">
          <div class="flex-center"><h4>Request Body:</h4></div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="requestBody" :rows="2" type="textarea" placeholder="input request body..." />
        </el-col>
      </el-row>

      <el-row class="m-5" v-show="showParamArea">
        <el-col :span="4">
          <div class="flex-center"><h4>Parameters:</h4></div>
        </el-col>
        <el-col :span="12" id="parameterArea">
          <!-- :key绑定为param.key会出现输入框bug，输入一个字母就卡住 -->
          <el-row class="m-5" :key="index" v-for="(param, index) in params">
            <el-col :span="6"><el-input v-model="param.key" placeholder="key1" clearable /></el-col>
            <el-col :span="2" style="display: flex; justify-content: center; align-items: center"> <label>=</label></el-col>
            <el-col :span="8"><el-input v-model="param.value" placeholder="val1" clearable /></el-col>
            <el-col :span="1"></el-col>
            <el-col :span="2"><RemoveFilled class="svg-btn" @click="removeItem(index, params)" /> </el-col>
            <el-col :span="2"><CirclePlusFilled class="svg-btn" @click="addItem(index, params)" /> </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="m-5">
        <el-col :span="4">
          <div class="flex-center"><h4>Headers:</h4></div>
        </el-col>
        <el-col :span="12" id="headerArea">
          <!-- :key绑定为param.key会出现输入框bug，输入一个字母就卡住 -->
          <el-row class="m-5" :key="index" v-for="(param, index) in headers">
            <el-col :span="6"><el-input v-model="param.key" placeholder="key1" clearable /></el-col>
            <el-col :span="2" style="display: flex; justify-content: center; align-items: center"> <label>=</label></el-col>
            <el-col :span="8"><el-input v-model="param.value" placeholder="val1" clearable /></el-col>
            <el-col :span="1"></el-col>
            <el-col :span="2"><RemoveFilled class="svg-btn" @click="removeItem(index, headers)" /> </el-col>
            <el-col :span="2"><CirclePlusFilled class="svg-btn" @click="addItem(index, headers)" /> </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="m-5">
        <el-col :span="4"> </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="generateCURL">Generate!</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="copyToClipboard">Copied to clipboard!</el-button>
        </el-col>
        <el-col :span="4"> </el-col>
      </el-row>

      <el-row class="m-5">
        <el-col :span="24">
          <el-input v-model="result" :rows="3" type="textarea" placeholder="input request body..." />
        </el-col>
      </el-row>
    </div>
    <div class="right-pane"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, computed } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard();

const httpMethod = ref('get');
const contentType = ref('');
const requestBody = ref('');
const url = ref('');
const result = ref('');
const showParamArea = computed(() => {
  return httpMethod.value == 'get';
});

const showRequestBodyArea = computed(() => {
  return httpMethod.value == 'post';
});

interface Param {
  key: string;
  value: string;
}

let params: Ref<Array<Param>> = ref([]);
params.value.push({ key: '', value: '' });

let headers: Ref<Array<Param>> = ref([]);
headers.value.push({ key: '', value: '' });

console.log(params, 'params...');

const methodOpts = [
  {
    value: 'get',
    label: 'get',
  },
  {
    value: 'post',
    label: 'post',
  },
  {
    value: 'put',
    label: 'put',
  },
  {
    value: 'delete',
    label: 'delete',
  },
];

const contentTypeOpts = [
  {
    value: 'application/json; charset=UTF-8',
    label: 'application/json; charset=UTF-8',
  },
  {
    value: 'text/html; charset=utf-8',
    label: 'text/html; charset=utf-8',
  },
  {
    value: 'multipart/form-data',
    label: 'multipart/form-data',
  },
  {
    value: 'text/plain',
    label: 'text/plain',
  },
];

onMounted(() => {
  // 添加path的hover事件
  let svgBtns = document.getElementsByClassName('svg-btn');
  console.log(svgBtns);
  var pathElement = document.querySelectorAll('.svg-btn path');
  console.log(pathElement);
  // 闭包处理
  for (var i = 0; i < pathElement.length; i++) {
    (function (index) {
      svgBtns[index].addEventListener('mouseover', () => {
        (pathElement[index] as HTMLElement).setAttribute('fill', 'green');
      });

      svgBtns[index].addEventListener('mouseout', () => {
        (pathElement[index] as HTMLElement).setAttribute('fill', 'black');
      });
    })(i);
  }
});

const removeItem = (index: number, list: Array<Param>) => {
  if (list.length == 1) {
    return;
  }
  list.splice(index, 1);
  console.log('after remove', list);
};

const addItem = (index: number, list: Array<Param>) => {
  if (list.length >= 15) {
    return;
  }

  let newItem = { key: 'newKey', value: 'newValue' };
  list.splice(index + 1, 0, newItem);

  console.log('after add', list);
};

const generateCURL = () => {
  // 拷贝一份进行过滤处理
  let paramsCopy = cloneDeep(params.value);
  paramsCopy = paramsCopy.filter((item: Param) => checkString(item.key) && checkString(item.value));
  console.log(paramsCopy);

  let ret = 'curl';
  // method
  ret += ' -X';
  switch (httpMethod.value) {
    case 'get':
      ret += ' GET';
      // 添加查询参数
      ret += ' -G';
      // 处理查询参数
      paramsCopy.forEach((item: Param) => {
        ret += ` -d "${item.key}=${item.value}"`;
      });
      break;
    case 'post':
      ret += ' POST';
      // request body
      if (checkString(contentType.value)) {
        ret += ' -H';
        ret += ` "content-type: ${contentType.value}"`;
        ret += ' -d';
        // let RequestBodyJson = JSON.stringify(requestBody.value).replace(/"/g, '\\"');
        // 去掉换行和空格
        const cleanedString = requestBody.value.replace(/[\r\n\s]+/g, '');
        // 将双引号转义
        const escapedString = cleanedString.replace(/"/g, '\\"');
        ret += ` "${escapedString}"`;
      }

      break;
    case 'put':
      ret += ' PUT';
      break;
    case 'delete':
      ret += ' DELETE';
      break;

    default:
      ret += ' GET';
      break;
  }

  // header
  // 拷贝一份进行过滤处理
  let headersCopy = cloneDeep(headers.value);
  console.log('headersCopy', headersCopy);
  headersCopy = headersCopy.filter((item: Param) => checkString(item.key) && checkString(item.value));

  for (var i = 0; i < headersCopy.length; i++) {
    ret += ' -H';
    ret += ` "${headersCopy[i].key}: ${headersCopy[i].value}"`;
  }

  // url
  ret += ` "${url.value}"`;
  result.value = ret;
  console.log(ret);
};

const checkString = (str: string) => {
  // 判断字符串是否不为空，包括不为 null、不为 ""，以及不为空白字符
  return str && str.trim() !== '';
};

const copyToClipboard = () => {
  try {
    toClipboard(result.value);
    console.log('Copied to clipboard');
  } catch (e) {
    console.error(e);
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 20px;
}
.left-pane {
  flex: 1;
  //   display: flex;
}
.right-pane {
  flex: 1;
  background-color: rgba(192, 235, 255, 0.582);
}

.flex-center {
  display: flex;
  align-items: center;
  margin: 10px;
}

.m-5 {
  margin: 5px;
}

#parameterArea {
  svg {
    width: 30px;
    height: 30px;
  }
}
</style>
