$(document).ready(function(){
  // 日付と時刻
  showDateAndTime();
  setInterval(showDateAndTime,1000);

  // カウントアップ
  $(".up").click(function() {
    changeCount(this, 1);
  });

  // カウントダウン
  $(".down").click(function() {
    changeCount(this, -1);
  });

  // カウント数値変更
  function changeCount(element, d) {
    var guildElement = element.parentElement;
    var countSpanElement = $(guildElement).find(".count span");
    var count = countSpanElement.text();
    count = parseInt(count) + d;
    if(count<0) count = 0;
    if(count>20) count = 20;
    countSpanElement.text(count);
  }

  // 状態の記録
  $("#record").click(function(){
    showGuildStatus();
  });

  // 自動記録OFF(デフォルト)
  $("#auto_record").data("auto", "off");
  // 状態の自動記録
  $("#auto_record").click(function(){
    // 自動記録状態取得
    var auto_status = $(this).data("auto");
    // 自動取得状態のON/OFFとボタン表示の切り替え
    if(auto_status === "off") {
      $("#auto_record").data("auto", "on");
      $("#auto_record").text("自動記録停止");
    } else { // offでなければonとみなす
      $("#auto_record").data("auto", "off");
      $("#auto_record").text("自動記録開始");
    }
  });

  // 日付と時刻の表示
  function showDateAndTime() {
    var date = new Date();
    $("#date").text(date.toLocaleDateString());
    $("#time").text(date.toLocaleTimeString());

    // 自動記録状態取得
    var auto_status = $("#auto_record").data("auto");
    // 自動記録中なら0秒ごとにギルドカウントを表示
    if(auto_status === "on" && date.getSeconds() === 0) {
      showGuildStatus();
    }
  }

  // ギルドカウント表示
  function showGuildStatus() {
    var record = getGuildStatus("#guild1") + getGuildStatus("#guild2") + getGuildStatus("#guild3") + getGuildStatus("#guild4");
    var date = new Date();
    var time = ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2);
    record = time + " " + record;
    var id = "_" + date.getTime(); // 現在のミリ秒をIDとして使用
    var buttonElement = "<button class='copy_record' data-clipboard-target='#" + id + "'>コピー</button>"
    var row = "<div><span id=" + id + ">" + record + "</span>" + buttonElement + "</div>";
    $("#list").append(row);

    // ギルドカウントコピーボタン
    $(".copy_record").click(function(){
var clipboard = new Clipboard('.copy_record');
    });
  }

  function getGuildStatus(guildId){
    var guildName = $(guildId).find(".name span").text();
    var guildCount = $(guildId).find(".count span").text();
    var guildStatus = guildName + guildCount;
    return guildStatus;
  }
});