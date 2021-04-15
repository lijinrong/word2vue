<template>
  <div class="wrapper">${content}</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.wrapper {
  color: #69797e;
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;

  .title {
    padding: 40px 20px 20px 20px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    text-indent: 0;
  }

  p {
    margin: 20px;
    font-size: 28px;
    font-weight: 500;
    line-height: 42px;
    text-indent: 2em;
  }

  b {
    font-weight: 700;
    color: #000;
  }

  table {
    width: 95%;
    margin-left: 10px;
    text-align: center;
    border-collapse: collapse;

    & tr td {
      border: 1px solid #a3abae;
    }
  }
  .underline {
    text-decoration: underline;
  }

  .explain {
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    color: #a3abae;
    text-align: center;
    background-color: #efeff4;
  }
}
</style>
