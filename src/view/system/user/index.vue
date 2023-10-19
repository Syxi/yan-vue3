<template>
    <el-card>
    <div class="search">
        <el-form :inline="true" :model="queryParams" ref="queryUserRef">
            <el-form-item label="用户" prop="keyword">
                <el-input v-model="queryParams.username" placeholder="用户名/姓名" @keyup.enter="queryUser" clearable />
            </el-form-item>

            <el-form-item label="状态">
                <el-select v-model="queryParams.status" placeholder="用户状态" clearable>
                    <el-option label="启用" value="0" />
                    <el-option label="禁用" value="1" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryUser"><el-icon><Search /></el-icon>搜索</el-button>
                <el-button type="primary" @click="resetQuery"><el-icon><Refresh /></el-icon>重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    <el-cal shadow="never">
        <template #header>
            <div class="flex justify-between">
                <el-button type="primary" @click="addOrUpdateUser()" v-hasPerm="['sys:user:add']" ><el-icon><Plus /></el-icon>添加</el-button>
                <el-button type="danger" @click="removeUser()" v-hasPerm="['sys:user:delete']" :disabled="userIds.length === 0"><el-icon><Delete /></el-icon>删除</el-button>
            </div>
        </template>
    </el-cal>

  <el-table v-loading="loading" border :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column key="id" align="center" width="100" property="id" label="id"/>
      <el-table-column key="username" align="center" property="username" label="登录账号"/>
      <el-table-column align="center" property="realName" label="用户姓名"/>
      <el-table-column align="center" property="gender" label="性别"/>
      <el-table-column align="center" property="roleNames" label="角色名称"/>
      <el-table-column align="center" property="mobile" label="手机号"/>
      <el-table-column align="center" property="email" label="邮箱"/>
      <el-table-column align="center" property="status" label="状态">
          <template #default="scope">
              <el-switch v-model="scope.row.status" :inactive-value="0" :active-value="1" @change="handleUserStatus(scope.row)"/>
          </template>
      </el-table-column>
      <el-table-column align="center" property="createTime" label="创建时间"/>
      <el-table-column fixed="right" label="操作">
          <template #default="scope">
              <el-button type="primary" size="small" link @click="resetPassword(scope.row)"><el-icon><RefreshRight /></el-icon>重置密码</el-button>
              <el-button type="primary" size="small" link @click="addOrUpdateUser(scope.row.userId)"><el-icon><Edit /></el-icon>编辑</el-button>
              <el-button type="primary" size="small" link @click="removeUser(scope.row.userId)"><el-icon><Delete /></el-icon>删除</el-button>
          </template>
      </el-table-column>
  </el-table>

  <el-pagination v-model:total="total" v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize" @current-change="queryUser" background/>
</el-card>

<!-- 表单弹窗 -->
<el-dialog  v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body @close="closeDialog" draggable="true">
    <el-form :model="formData" :rules="userFormRules" ref="userFormRef" label-width="80px">

      <el-form-item label="登录账号" prop="username">
        <el-input v-model="formData.username" :readonly="!!formData.userId" placeholder="请输入登录账号"/>
      </el-form-item>

      <el-form-item label="用户姓名" prop="realName">
        <el-input v-model="formData.realName" placeholder="请输入用户姓名"/>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="formData.gender" placeholder="请选择">
          <el-option label="保密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="formData.roleIds" placeholder="请选择">
          <el-option v-for="item in roles" :value="item.value" :label="item.label" :key="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号码" maxlength="11" />
      </el-form-item>

      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formData.email" placeholder="请输入邮箱" maxlength="50" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
        </div>
    </template>
</el-dialog>

</template>







<script lang="ts">
export default {
    name: 'user'
};
</script>

<script setup lang="ts">
import { getUserList, getUserDetail, addUser, editUser, deleteUser, updateUserStatus, resetPwd } from '@/api/user/index';
import { UserQuery, UserPage, UserForm} from '@/api/user/types';
import { deptOption } from "@/api/dept/index";
import { roleOption } from "@/api/role/index";
import { ElForm, ElMessage, ElMessageBox } from "element-plus";

// 分页总记录数
const total = ref(0);

const loading = ref(false);

// 用户ids
const userIds = ref([]);

// 查询参数
const queryParams = reactive<UserQuery>({
    pageNum: 1,
    pageSize: 10
});


// 分页列表数据
const userList = ref<UserPage[]>();

// 角色下拉选项
const roles = ref<OptionType[]>();

// 部门下拉选项
const depts = ref<OptionType[]>();

// 查询表单
const queryUserRef = ref(ElForm);

// 用户新增、编辑表单
const userFormRef = ref(ElForm);

// 表单数据
const formData = reactive<UserForm>({
    status: 0,
});

const dialog = reactive<DialogOption>({
    visible: false
});

const userFormRules = reactive({
    username: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
    nickName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    deptId: [{ required: true, message: '所属部门不能为空', trigger: 'blur' }],
    roleIds: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }],
    email: [{ pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '请输入正确的邮箱地址', trigger: 'blur' }],
    mobile: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }]
});


// 查询用户事件
function queryUser() {
    loading.value = true;
    getUserList(queryParams).then( ({ data }) => {
        userList.value = data.list;
        total.value = data.total;
    }).finally(() => {
        loading.value = false;
    });
}


// 重置查询事件
function resetQuery() {
    queryUserRef.value.resetFields();
    queryParams.pageNum = 1;
    queryUser();
}


// 修改用户状态
function handleUserStatus(row: { [key: string]: any }) {
    const text = row.status === 0 ? "启用" : "停用";
    ElMessageBox.confirm("确定要" + text + row.username + "用户吗", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then( () => {
        return updateUserStatus(row.id, row.status);
    }).then( () => {
        ElMessage.success(text + "成功!");
    }).catch( () => {
        row.status = row.status === 0 ? 1 : 0;
    });
}


// 行checkbox 单选或多选事件
function handleSelectionChange(selection: any) {
    userIds.value = selection.map( (item: any) => item.id);
}

// 新增或编辑用户弹出窗口事件
async function addOrUpdateUser(userId?: string) {
    await getDeptOptions();
    await getRoleOptions();
    dialog.visible = true;
    if (userId) {
        dialog.title = '修改用户';
        getUserDetail(userId).then( ({ data }) => {
            Object.assign(FormData, data);
        });
    } else {
        dialog.title = "新增用户";
    }
}


// 获取部门下拉选项
async function getDeptOptions() {
    deptOption().then( (response) => {
        depts.value = response.data;
    });
}


// 获取角色下拉选项
async function getRoleOptions() {
    roleOption().then( (response) => {
        roles.value = response.data;
    });
}



// 删除用户事件
function removeUser(userId?: string) {
    const ids = [userId || userIds.value].join(',');
    if(!ids) {
        ElMessage.warning('请勾选删除项!');
        return;
    }

    ElMessageBox.confirm('确定删除用户?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then( function() {
        deleteUser(ids).then( () => {
            ElMessage.success('删除成功!');
            resetQuery();
        });
    });
}


// 关闭用户表单弹窗
function closeDialog() {
    dialog.visible = false;
    resetForm();
}


// 重置表单
function resetForm() {
    userFormRef.value.resetFields();
    userFormRef.value.clearValidate();

    formData.userId = undefined;
    formData.status = 0;
}


// 提交表单
const handleSubmit = useThrottleFn( () => {
    userFormRef.value.validate( (valid: any) => {
        if (valid) {
            const userId = formData.userId;
            loading.value = true;
            if (userId) {
                editUser(userId, formData).then( () => {
                    ElMessage.success("修改用户成功!");
                    closeDialog();
                    resetQuery();
                }).finally( () => (loading.value = false));
            } else {
                addUser(formData).then( () => {
                    ElForm.success("新增用户成功！");
                    closeDialog();
                    resetQuery();
                }).finally( () => (loading.value = false));
            }
        }
    })
}, 3000);


// 重置密码
function resetPassword(row: { [key: string]: any }) {
    ElMessageBox.prompt("请输入用户 [ " + row.username + "]的新密码", "重置密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
    }).then(({ value }) => {
        if(!value) {
            ElMessage.warning("请输入新密码");
            return false;
        }
        resetPwd(row.id, value).then( () => {
            ElMessage.success("密码重置成功，新密码是：" + value);
        });
    }).catch( () => {});
}


onMounted(() => {
    // 初始化用户列表数据
    queryUser();
})


</script>