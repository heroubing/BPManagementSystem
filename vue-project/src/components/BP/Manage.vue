<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="搜索(BP列表)关键字:">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" class="select">
          <el-option label="按标题" value="shanghai"></el-option>
          <el-option label="按关键字" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="BP标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="提交人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="date"
        label="上传时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableDate)"
            type="text"
            size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Manage",
    data() {
      return {
        formInline: {
          user: '',
          region: 'shanghai',
        },
        tableData: [
          {
            id: 'BP1',
            date: '2016-05-03',
            name: 'service1',
          },
          {
            id: 'BP2',
            date: '2016-05-02',
            name: 'service2',
          },
          {
            id: 'BP3',
            date: '2016-05-04',
            name: 'service6',
          },
          {
            id: 'BP4',
            date: '2016-05-01',
            name: 'service7',
          },
        ],
        multipleSelection: [],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    }
  }
</script>

<style scoped>
  .select {
    width: 120px;
  }
</style>
