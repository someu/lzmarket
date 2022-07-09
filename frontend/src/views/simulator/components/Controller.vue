<template>
  <div class="controller">
    <div class="title">controller</div>
    <el-form label-width="120px">
      <el-form-item label="开始时间">
        <el-date-picker v-model="controller.startAt" type="datetime" />
      </el-form-item>
      <el-form-item label="模拟周期(m)">
        <el-input v-model="controller.mockPeriod" />
      </el-form-item>
      <el-form-item label="真实周期(s)">
        <el-input v-model="controller.realPriod" />
      </el-form-item>
      <el-form-item label="撮合方式">
        <el-radio-group v-model="controller.makeType">
          <el-radio label="auto">自动</el-radio>
          <el-radio label="manual">手动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="撮合间隔(s)" v-if="controller.makeType === 'auto'">
        <el-input-number v-model="controller.autoMakeInterval" :min="1" />
      </el-form-item>
      <el-form-item label="" v-if="controller.makeType === 'manual'">
        <el-button type="primary">手动撮合</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      controller: {},
    };
  },
};
</script>
