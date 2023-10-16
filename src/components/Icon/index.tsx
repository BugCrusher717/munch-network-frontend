import React from "react";
import cn from "classnames";
import styles from "./Icon.module.sass";

type IconsType = {
  [key: string]: string;
};

const icons: IconsType = {
  apple:
    "M13.426 8.116l-1.092.412-.12.036-.076.012-.076.001-.064-.006-.076-.016-.1-.029-.318-.113-.387-.147c-.828-.317-1.397-.452-2.078-.402-2.85-.002-5.289 2.357-5.289 5.849 0 3.786 3.025 8.468 5.512 8.537l.149-.001c.489.001.855-.084 1.333-.282l.321-.141c.491-.221.75-.292 1.216-.292.407 0 .65.053 1.052.218l.237.101c.652.284 1.06.397 1.711.397 1.923 0 3.871-2.382 4.913-4.942a.75.75 0 0 0-.355-.952c-2.509-1.272-2.792-4.124-.598-5.497a.75.75 0 0 0 .205-1.082l-.171-.219c-.987-1.203-2.286-1.726-3.5-1.78l-.17-.005.051.006c-.728-.093-1.377.028-2.231.338zm1.84 1.135l.238.018.182.005a3.32 3.32 0 0 1 1.951.754l.099.088-.135.125c-2.07 1.993-1.701 5.22.789 6.988l.149.102-.027.058c-.875 1.781-2.269 3.36-3.233 3.36-.353 0-.572-.048-.943-.2l-.222-.095c-.692-.302-1.125-.421-1.835-.421a3.75 3.75 0 0 0-1.59.32l-.349.153c-.413.185-.623.244-.968.244-1.503.071-4.125-3.921-4.125-7.036 0-2.652 1.756-4.351 3.844-4.351.409-.028.762.042 1.283.229l.829.312.213.073.17.05.144.03a1.46 1.46 0 0 0 .068.009l.138.01.156.002c.259 0 .519-.059.843-.17l.24-.088.528-.206c.618-.239 1.062-.358 1.466-.364l.096.002zm.687-7.501c-2.968.095-5.543 2.504-5.167 4.858a.75.75 0 0 0 .687.63c2.814.202 5.602-2.298 5.247-4.842a.75.75 0 0 0-.767-.646zm-.778 1.607l-.035.116c-.341 1.009-1.436 1.941-2.667 2.204l-.165.03.004-.011c.266-.96 1.336-1.928 2.684-2.294l.178-.044z",
  "arrow-down":
    "M5.47 8.47a.75.75 0 0 1 .977-.073l.084.073L12 13.939l5.47-5.469a.75.75 0 0 1 .977-.073l.084.073a.75.75 0 0 1 .073.977l-.073.084-6 6a.75.75 0 0 1-.977.073l-.084-.073-6-6a.75.75 0 0 1 0-1.061z",
  "arrow-left":
    "M11.707 3.293a1 1 0 0 1 .083 1.32l-.083.094L5.415 11H21a1 1 0 0 1 .117 1.993L21 13H5.415l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-8-8-.073-.082.073.082a1.01 1.01 0 0 1-.097-.112l-.05-.075-.021-.037-.031-.061-.022-.052-.022-.06-.014-.046-.016-.065-.009-.052-.007-.059-.004-.07v-.038l.004-.071L2 12a1.01 1.01 0 0 1 .011-.149l.009-.052.015-.065.014-.046.021-.059.023-.052.031-.061.021-.036.05-.074.013-.018c.028-.036.055-.066.083-.094l8-8a1 1 0 0 1 1.414 0z",
  "arrow-right":
    "M13.293 17.793a1 1 0 0 0 1.414 1.414l5.793-5.793a2 2 0 0 0 0-2.828l-5.793-5.793a1 1 0 0 0-1.414 1.414L18.086 11H4a1 1 0 1 0 0 2h14.086l-4.793 4.793z",
  "arrow-right-thin":
    "M13.446 3.397l.084.073 8 8c.025.025.049.053.071.082l-.071-.082c.037.037.069.077.097.119l.037.063.013.027a.75.75 0 0 1 .034.085l.006.019c.021.068.032.142.032.218 0 .038-.003.076-.008.113l-.006.035c-.005.025-.011.049-.018.073l-.012.036-.028.067-.018.036c-.013.024-.027.047-.043.069l-.013.018-.073.084-8 8a.75.75 0 0 1-1.133-.977l.073-.084 6.719-6.72H3a.75.75 0 0 1-.102-1.493L3 11.25h16.189L12.47 4.53a.75.75 0 0 1-.073-.977l.073-.084a.75.75 0 0 1 .977-.073z",
  balance:
    "M10.831 8.013l-4.879 6.099c-.786.982-.086 2.437 1.171 2.437h9.758c1.258 0 1.957-1.455 1.171-2.437l-4.879-6.099a1.5 1.5 0 0 0-2.343 0z",
  check:
    "M18.463 6.477a.75.75 0 0 1 1.146.962l-.072.085-9.74 10a.75.75 0 0 1-1.001.067l-.084-.078-4.26-4.556a.75.75 0 0 1 1.014-1.1l.082.075 3.723 3.981 9.192-9.436z",
  "check-fat":
    "M17.92 5.973a1.5 1.5 0 0 1 2.272 1.95l-.123.143-9.74 10a1.5 1.5 0 0 1-2.028.111l-.142-.133-4.26-4.556a1.5 1.5 0 0 1 2.054-2.179l.137.129 3.185 3.406 8.644-8.872z",
  close:
    "M6.446 5.397l.084.073L12 10.939l5.47-5.469a.75.75 0 0 1 1.133.977l-.073.084L13.061 12l5.469 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L12 13.061 6.53 18.53a.75.75 0 0 1-1.133-.977l.073-.084L10.939 12 5.47 6.53a.75.75 0 0 1 .977-1.133z",
  "close-fat":
    "M6.613 5.21l.094.083L12 10.585l5.293-5.292a1 1 0 0 1 1.497 1.32l-.083.094L13.415 12l5.292 5.293a1 1 0 0 1-1.32 1.497l-.094-.083L12 13.415l-5.293 5.292a1 1 0 0 1-1.497-1.32l.083-.094L10.585 12 5.293 6.707a1 1 0 0 1 1.32-1.497z",
  "close-square":
    "M12 2.25l.627.006.304.007h0l.59.024c5.586.296 7.754 2.387 8.157 8.037h0l.035.597c.015.305.025.62.03.945h0l.006.663c0 6.941-2.394 9.221-9.75 9.221-7.414 0-9.75-2.336-9.75-9.75S4.586 2.25 12 2.25h0zm0 1.5l-.594.005a27.8 27.8 0 0 0-.84.026h0l-.527.031-.501.042h0l-.475.054c-3.316.434-4.72 1.838-5.155 5.155h0l-.054.475a19.08 19.08 0 0 0-.059.761h0l-.025.54-.015.567h0L3.75 12l.005.594.026.84h0l.031.527.042.501h0l.054.475c.434 3.316 1.838 4.72 5.155 5.155h0l.475.054a19.08 19.08 0 0 0 .761.059h0l.54.025.567.015h0l.594.005.308-.001h0l.594-.01.286-.009h0l.552-.026.525-.038.252-.023h0l.484-.056c3.536-.467 4.882-2.017 5.181-5.687h0l.034-.502.022-.528.007-.274h0l.005-.567-.005-.628-.014-.599-.024-.571-.035-.543h0l-.046-.516-.058-.49c-.501-3.734-2.137-5.082-6.126-5.369h0l-.522-.031-.548-.02-.284-.006h0L12 3.75zm2.78 5.47a.75.75 0 0 1 .073.977l-.073.084L13.061 12l1.719 1.72a.75.75 0 0 1-.977 1.133l-.084-.073L12 13.061l-1.72 1.719a.75.75 0 0 1-1.133-.977l.073-.084L10.939 12 9.22 10.28a.75.75 0 0 1 .874-1.197l.102.064.084.073L12 10.939l1.72-1.719a.75.75 0 0 1 1.061 0z",
  copy: "M8.992 6.792l.328.002c5.614.083 7.872 2.326 7.872 8.198 0 5.984-2.346 8.2-8.2 8.2-5.895 0-8.125-1.935-8.198-7.894l-.002-.306.002-.334C.873 8.72 3.106 6.792 8.992 6.792zm0 2.4l-.284.001-.451.008.005.028c.1.634.133 1.291.054 1.932-.106.862-.405 1.611-.974 2.179s-1.317.868-2.179.973c-.641.079-1.297.046-1.932-.054l-.029-.005v.03h0l-.003.137-.006.571.006.571.003.137h0l.004.135.024.516c.171 2.816.986 3.93 3.295 4.293l.221.032.441.049.115.01h0l.117.009.49.028.525.016.275.004h0l.284.001.286-.002c.251-.003.491-.01.721-.021l.337-.02.478-.043c2.77-.306 3.776-1.5 3.949-4.607l.013-.263.014-.554v-.581l-.014-.554c-.156-3.928-1.517-4.956-5.784-4.956zm6.922-8.4c5.295 0 7.201 2.055 7.277 6.982l.002.312c0 4.138-.552 6.09-2.839 6.811-.346.109-.733.197-1.196.277a1.2 1.2 0 1 1-.409-2.365l.402-.077c.184-.04.343-.081.481-.124.592-.187.931-.839 1.076-2.322l.038-.47.027-.522.009-.281.01-.604.001-.323-.006-.525-.019-.488a11.97 11.97 0 0 0-.033-.453l-.048-.419c-.319-2.279-1.448-2.97-4.499-3.008h-.603l-.609.01-.548.022c-1.989.105-2.714.466-3.044 1.239-.088.205-.157.458-.206.764a1.2 1.2 0 0 1-2.37-.379c.079-.492.199-.932.369-1.33C10 1.6 11.564.919 14.841.809l.703-.015.37-.002zM3.48 11.866l.125.023c.432.068.877.09 1.265.043.375-.046.637-.151.775-.288s.242-.4.288-.775c.048-.388.025-.833-.043-1.265l-.024-.128c-1.319.344-2.035 1.052-2.385 2.391z",
  copied:
    "M8.992 6.792l.328.002c5.614.083 7.872 2.326 7.872 8.198 0 5.984-2.346 8.2-8.2 8.2-5.895 0-8.125-1.935-8.198-7.894l-.002-.306.002-.334C.873 8.72 3.106 6.792 8.992 6.792zm0 2.4l-.284.001-.451.008.005.028c.1.634.133 1.291.054 1.932-.106.862-.405 1.611-.974 2.179s-1.317.868-2.179.973c-.641.079-1.297.046-1.932-.054l-.029-.005v.03h0l-.003.137-.006.571.006.571.003.137h0l.004.135.024.516c.171 2.816.986 3.93 3.295 4.293l.221.032.441.049.115.01h0l.117.009.49.028.525.016.275.004h0l.284.001.286-.002c.251-.003.491-.01.721-.021l.337-.02.478-.043c2.77-.306 3.776-1.5 3.949-4.607l.013-.263.014-.554v-.581l-.014-.554c-.156-3.928-1.517-4.956-5.784-4.956zm6.922-8.4c5.295 0 7.201 2.055 7.277 6.982l.002.312c0 4.138-.552 6.09-2.839 6.811-.346.109-.733.197-1.196.277a1.2 1.2 0 1 1-.409-2.365l.402-.077c.184-.04.343-.081.481-.124.592-.187.931-.839 1.076-2.322l.038-.47.027-.522.009-.281.01-.604.001-.323-.006-.525-.019-.488a11.97 11.97 0 0 0-.033-.453l-.048-.419c-.319-2.279-1.448-2.97-4.499-3.008h-.603l-.609.01-.548.022c-1.989.105-2.714.466-3.044 1.239-.088.205-.157.458-.206.764a1.2 1.2 0 0 1-2.37-.379c.079-.492.199-.932.369-1.33C10 1.6 11.564.919 14.841.809l.703-.015.37-.002zM3.48 11.866l.125.023c.432.068.877.09 1.265.043.375-.046.637-.151.775-.288s.242-.4.288-.775c.048-.388.025-.833-.043-1.265l-.024-.128c-1.319.344-2.035 1.052-2.385 2.391z",
  country:
    "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.224 11.001H8.776c.175 3.38 1.218 6.094 2.42 6.959.264.026.532.04.804.04s.54-.014.804-.04c1.202-.865 2.245-3.579 2.42-6.959zM7.273 13l-3.211.001c.356 2.851 2.212 5.236 4.753 6.34-.868-1.587-1.425-3.83-1.542-6.34zm12.665.001L16.727 13c-.117 2.51-.673 4.753-1.542 6.34 2.541-1.103 4.397-3.488 4.753-6.339zM8.815 4.66l-.09.039C6.229 5.82 4.413 8.183 4.062 11l3.211.001c.117-2.51.673-4.754 1.542-6.341zM12 4c-.271 0-.54.014-.804.04-1.202.865-2.245 3.579-2.42 6.96h6.449c-.175-3.381-1.218-6.095-2.421-6.96A8.14 8.14 0 0 0 12 4zm3.185.659l.036.067c.848 1.583 1.39 3.799 1.505 6.274L19.938 11c-.356-2.851-2.212-5.237-4.753-6.341z",
  dots: "M12 10.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5zm4 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5zm-8 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5z",
  grid: "M15 3a6 6 0 0 1 6 6h0v6a6 6 0 0 1-6 6h0-6a6 6 0 0 1-6-6h0V9a6 6 0 0 1 6-6h0zM5 13v2a4 4 0 0 0 4 4h0 2v-6H5zm14 0h-6v6h2a4 4 0 0 0 4-4h0v-2zm-4-8h-2v6h6V9a4 4 0 0 0-4-4h0zM5 11h6V5H9a4 4 0 0 0-4 4h0v2z",
  edit: "M12.493 4.878c2.153-2.153 5.027-2.109 6.882-.253s1.9 4.729-.253 6.882h0l-6.198 6.185-1.389 1.403c-1.513 1.544-7.086 2.184-7.942 1.189-.824-.959-.169-6.298 1.301-7.806h0l.132-.135 1.07-1.084zM19 19.25a.75.75 0 0 1 .102 1.493L19 20.75h-5a.75.75 0 0 1-.102-1.493L14 19.25h5zM12.214 7.274l-4.857 4.843-1.389 1.407c-.509.522-.919 1.805-1.111 3.372-.081.66-.116 1.322-.104 1.855h0l.009.225.018.232.163.018.263.016c.529.022 1.199-.006 1.87-.083 1.582-.182 2.881-.597 3.388-1.114h0l.885-.897 5.44-5.429c-.083-.024-.162-.063-.235-.117l-.084-.073-4.256-4.256zm6.101-1.589c-1.277-1.277-3.201-1.306-4.761.254h0l-.277.276 4.255 4.254c.092.092.155.203.19.32l.341-.343c1.559-1.56 1.53-3.484.253-4.761z",
  email:
    "M12 3.25c4.728 0 8.609 3.796 8.746 8.493l.004.257-.003.468-.003.125c-.514 4.113-3.961 5.444-5.833 3.072a3.32 3.32 0 0 1-.394-.616c-1.236 1.556-3.193 2.258-4.907 1.544-2.147-.895-2.984-3.626-1.965-6.073s3.549-3.775 5.696-2.88c.901.376 1.571 1.074 1.971 1.94l.178-.523a.75.75 0 1 1 1.419.488l-.298.879-.249.768-.14.455-.12.412-.052.191-.09.354c-.027.112-.05.218-.071.319l-.052.286a4.31 4.31 0 0 0-.044.375l-.007.218c.003.412.11.69.303.935.959 1.215 2.704.586 3.127-2.002l.034-.233V12c0-3.986-3.264-7.25-7.25-7.25S4.75 8.014 4.75 12s3.264 7.25 7.25 7.25c.917 0 1.693-.111 2.337-.352a.75.75 0 1 1 .527 1.404c-.833.312-1.78.448-2.863.448-4.814 0-8.75-3.936-8.75-8.75S7.186 3.25 12 3.25zm.765 5.774c-1.319-.55-3.012.339-3.735 2.073s-.162 3.562 1.157 4.111 3.012-.339 3.735-2.073.162-3.562-1.157-4.111z",
  "external-link":
    "M11 3.501a1.5 1.5 0 0 1 0 3l-.687.007-.325.008-.615.028-.569.045c-2.733.267-3.808 1.209-4.159 3.713l-.061.522-.043.565-.027.61-.013.656-.002.346.019 1.005.036.613c.251 3.248 1.41 4.495 4.537 4.802l.591.046.635.026.335.006.694.001.658-.013.611-.027.566-.043c2.902-.273 3.949-1.295 4.231-4.216l.044-.57.028-.616.008-.326.006-.689a1.5 1.5 0 1 1 3 0c0 6.759-2.194 9.22-8.349 9.477l-.758.02-.393.003c-6.828 0-9.5-2.672-9.5-9.5l.003-.4.021-.77c.264-6.129 2.742-8.33 9.476-8.33zM21 1.5a1.5 1.5 0 0 1 1.49 1.325L22.5 3v6a1.5 1.5 0 0 1-2.99.175L19.5 9V6.616l-5.443 5.445a1.5 1.5 0 0 1-2.246-1.98l.125-.141L17.374 4.5H15a1.5 1.5 0 0 1-1.49-1.325L13.5 3a1.5 1.5 0 0 1 1.325-1.49L15 1.5h6z",
  facebook:
    "M12.162 2.25l.16.001.625.012.599.025h0l.573.038c5.046.403 7.048 2.444 7.517 7.448h0l.046.568.018.293h0l.028.606.016.631.005.657c0 6.638-2.59 9.221-9.75 9.221-7.414 0-9.75-2.336-9.75-9.75 0-7.111 2.524-9.75 9.75-9.75l.322.002zM12 3.75l-.305.002h0l-.59.012-.562.025c-4.299.251-6.127 1.734-6.636 5.492h0l-.058.492-.044.517-.017.268h0l-.024.556A27.86 27.86 0 0 0 3.75 12h0l.005.594.026.84h0l.031.527.042.501h0l.054.475c.434 3.316 1.838 4.72 5.155 5.155h0l.475.054a19.08 19.08 0 0 0 .761.059h0l.54.025.567.015h0l.594.005c.317 0 .622-.005.917-.015h0l.576-.026c5.146-.305 6.757-2.355 6.757-7.68h0l-.01-.926-.018-.582-.028-.554-.039-.527h0l-.05-.501c-.445-3.903-2.021-5.327-6.138-5.626h0l-.528-.032-.274-.012h0l-.569-.015zm2.5 3a.75.75 0 1 1 0 1.5l-.3.003-.136.004-.247.015c-.69.062-.94.283-1.025 1.006l-.023.26-.008.145-.009.321-.002.365v.38H14a.75.75 0 0 1 .102 1.493L14 12.25h-1.25v4.25a.75.75 0 0 1-1.493.102l-.007-.102v-4.25H10a.75.75 0 0 1-.102-1.493L10 10.75h1.25v-.38c0-2.735.788-3.62 3.25-3.62z",
  "facebook-fat":
    "M12 2c6.98 0 9.502 2.1 9.931 8.333h0l.034.597.022.621.007.32h0l.005.659C22 19.306 19.298 22 12 22 4.448 22 2 19.552 2 12 2 4.753 4.633 2 12 2zm0 2l-.303.001h0l-.585.012c-5.141.165-6.873 1.867-7.088 6.829h0l-.018.565L4 12h0l.005.59.014.562h0l.025.535.036.508c.33 3.957 1.769 5.396 5.726 5.726h0l.508.036.264.014h0l.548.019.285.006h0L12 20h0l.306-.002.591-.012.562-.025h0l.534-.038c4.078-.351 5.647-1.955 5.95-5.807h0l.032-.504.011-.261h0l.012-.541.002-.28-.001-.315h0l-.008-.607-.008-.293h0l-.022-.564-.032-.536c-.019-.261-.042-.512-.069-.753h0l-.06-.469c-.454-3.114-1.771-4.422-4.886-4.836h0l-.469-.054-.495-.042-.522-.031h0l-.55-.02-.285-.006h0zm2.5 2.5a1 1 0 1 1 0 2l-.406.004-.225.01c-.625.044-.801.223-.85.942l-.012.26-.006.473v.312h1a1 1 0 0 1 .117 1.993L14 12.5h-1v4a1 1 0 0 1-1.993.117L11 16.5v-4h-1a1 1 0 0 1-.117-1.993L10 10.5h1v-.13c0-2.867.893-3.87 3.5-3.87z",
  filter:
    "M12 3.25l-.734.005-.708.015-.681.026-.33.017-.641.041-.31.025-.6.057-.572.068-1.306.215-.472.105C3.437 4.357 2.25 5.269 2.25 6.587c0 1.048.602 1.889 2.125 3.174l.418.346.709.562 1.009.78.426.336.562.457.326.276.289.254.253.235.218.216.185.199c.337.383.481.673.481.926v4.656c0 1.599 1.421 2.059 2.981 1.554 1.37-.443 2.519-1.459 2.519-2.589v-3.621c0-.252.144-.543.481-.926l.185-.199.218-.216.253-.235.289-.254.326-.276.562-.457.654-.513.781-.603.483-.381.225-.181.418-.346c1.523-1.285 2.125-2.126 2.125-3.174 0-1.318-1.187-2.229-3.398-2.763l-.472-.105-1.306-.215-.572-.068-.6-.057-.627-.047-.324-.019-.668-.031-.694-.021-.721-.01L12 3.25zm.361 1.501l.699.011.668.021.322.014.622.035.59.044.283.025.543.057.511.065.478.073.227.039.43.083.397.089c1.394.339 2.119.798 2.119 1.279 0 .282-.182.622-.582 1.064l-.218.23-.123.122-.274.257-.152.136-.333.288-.373.309-.414.332-1.507 1.17-.455.362-.412.336-.19.159-.349.303-.31.284-.272.268c-.761.782-1.036 1.385-1.036 2.14v3.621c0 .314-.659.896-1.481 1.162-.74.239-1.019.149-1.019-.127v-4.656c0-.755-.275-1.358-1.036-2.14l-.272-.268-.31-.284-.349-.303-.39-.324-.211-.171-.7-.553-1.039-.803-.435-.344-.202-.163-.373-.309-.333-.288-.294-.267-.255-.248-.218-.23c-.4-.442-.582-.782-.582-1.064 0-.481.725-.94 2.119-1.279l.397-.089.43-.083.227-.039.478-.073.511-.065.543-.057.574-.049.606-.04.637-.031.668-.021.699-.011h.722z",
  "filter-1":
    "M11.959 2.25c.77 0 1.935.378 3.168.945h0l.532.254c2.135 1.058 4.334 2.592 4.949 3.65.993 1.709.993 8.094 0 9.802-.615 1.058-2.814 2.592-4.949 3.65h0l-.532.254c-1.233.567-2.398.945-3.168.945-2.286 0-7.523-2.913-8.648-4.849-.816-1.403-.942-8.181 0-9.802C4.355 5.301 9.742 2.25 11.959 2.25zm0 1.5c-1.686 0-6.577 2.77-7.352 4.103-.323.555-.462 2.3-.457 4.057h0l.009.657.022.645.034.619c.074 1.102.209 2.001.392 2.316.438.754 1.905 1.818 3.465 2.673h0l.522.277c1.308.669 2.61 1.153 3.364 1.153.695 0 1.956-.487 3.245-1.148h0l.516-.273c1.631-.89 3.192-1.995 3.59-2.681.722-1.243.722-7.052 0-8.295-.336-.578-1.496-1.452-2.827-2.246h0l-.506-.293h0l-.257-.142-.516-.273c-1.289-.662-2.55-1.148-3.245-1.148zm.002 4.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 1 1 0-7.5zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 1 0 0-4.5z",
  flash:
    "M11.577 2.002l-.084.081-.074.09-6.842 9.409-.039.042c-1.161 1.328-.342 3.484 1.512 3.484l3.384-.001v5.272c0 1.872 2.162 2.84 3.5 1.504l.12-.144 6.337-9.296.032-.034c1.235-1.402.365-3.58-1.515-3.58l-2.887-.001.001-5.27c0-1.76-2.105-2.702-3.444-1.556zm1.373 1.502c.038.006.071.03.071.054v5.475c0 1.037.829 1.796 1.797 1.796h3.089c.109 0 .154.12-.009.283l-.12.144-6.297 9.237-.007.004c-.026.002-.041-.033-.041-.117v-5.475c0-1.037-.829-1.796-1.797-1.796H6.049c-.049 0-.078-.059-.03-.136l.141-.167 6.762-9.302h.028z",
  "full-view":
    "M4.993 9.115a1 1 0 0 1-1.987.002L3 9.001l.002-.228a12.94 12.94 0 0 1 .203-2.018c.168-.911.427-1.639.854-2.155.503-.609 1.363-.976 2.537-1.248l1.194-.221.564-.073.493-.049.085-.006a1 1 0 1 1 .136 1.995l-.363.033-.264.03-1.394.239-.187.045-.343.096c-.483.148-.814.309-.916.432-.157.19-.318.64-.429 1.244a10.9 10.9 0 0 0-.151 1.291l-.015.291-.007.3-.007.116zm10.075-6.113l.433.039.301.035 1.601.276c1.174.271 2.033.639 2.537 1.248.427.516.686 1.244.854 2.155a12.94 12.94 0 0 1 .203 2.018l.002.228a1 1 0 0 1-1.993.114L19 8.999l-.007-.3-.015-.291a10.9 10.9 0 0 0-.151-1.291c-.111-.604-.271-1.053-.429-1.243-.101-.123-.433-.284-.916-.432l-.343-.096-.187-.045-1.036-.191-.496-.064L15 5.003l-.068-.005a1 1 0 0 1 .019-1.997l.117.001zm3.939 11.882a1 1 0 0 1 1.987-.002l.007.117c0 .578-.05 1.404-.205 2.246-.168.911-.427 1.639-.854 2.155-.503.609-1.363.976-2.537 1.248l-1.195.221-.564.073-.493.049-.085.006a1 1 0 1 1-.136-1.995l.363-.033.264-.03 1.394-.239.187-.045.343-.096c.483-.148.814-.309.916-.432.157-.19.318-.64.429-1.244a10.9 10.9 0 0 0 .151-1.291l.015-.291.007-.3.007-.116zM4.001 14a1 1 0 0 1 .992.884l.007.117.007.3.015.291a10.9 10.9 0 0 0 .151 1.291c.111.604.271 1.053.429 1.244.101.123.433.284.915.432l.343.096.187.045 1.036.191.496.064.421.042.068.005a1 1 0 1 1-.136 1.995l-.433-.039-.301-.035-1.601-.276c-1.174-.271-2.033-.639-2.537-1.248-.427-.516-.686-1.244-.854-2.155a12.94 12.94 0 0 1-.203-2.018L3 14.999l.007-.117A1 1 0 0 1 4.001 14z",
  "google-play":
    "M12.01 4.25c2.464 0 4.804 1.209 6.288 3.188a.75.75 0 1 1-1.2.9C15.893 6.731 13.995 5.75 12.01 5.75c-3.436 0-6.25 2.814-6.25 6.25s2.814 6.25 6.25 6.25c2.903 0 5.39-2.019 6.068-4.754l.02-.09H12.01a.75.75 0 0 1-.743-.648l-.007-.102a.75.75 0 0 1 .648-.743l.102-.007h6.969a.75.75 0 0 1 .747.82c-.372 3.953-3.723 7.023-7.716 7.023-4.264 0-7.75-3.486-7.75-7.75s3.486-7.75 7.75-7.75z",
  link: "M13.431 9.876l.194.246.366.479c2.752 3.677 2.734 5.704-.315 8.766-2.901 2.914-4.941 2.745-7.77.23-2.274-2.022-2.449-4.097-.877-6.628a1 1 0 1 1 1.699 1.055c-1.083 1.744-.999 2.739.507 4.078 2.099 1.867 2.95 1.937 5.024-.147l.315-.323.284-.307.253-.294c1.303-1.582 1.184-2.639-.416-4.83l-.307-.411-.522-.669a1 1 0 0 1 1.564-1.246zm4.661-5.475c2.274 2.022 2.449 4.097.878 6.628a1 1 0 1 1-1.699-1.055c1.083-1.744.999-2.739-.507-4.078-2.099-1.867-2.95-1.937-5.024.147l-.315.323-.284.307-.253.294c-1.303 1.582-1.184 2.639.416 4.83l.307.411.522.669a1 1 0 1 1-1.564 1.246l-.194-.246-.366-.479c-2.752-3.677-2.734-5.704.315-8.766 2.901-2.914 4.941-2.745 7.77-.23z",
  linkedin:
    "M12 2.25a9.75 9.75 0 1 1 0 19.5A9.75 9.75 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 1 0 0-16.5zm-3.529 7.105a.75.75 0 0 1 .743.648l.007.102V15.5a.75.75 0 0 1-1.493.102l-.007-.102v-3.896a.75.75 0 0 1 .75-.75zm5.786-1.704c1.389.014 2.409.861 2.488 2.275l.005.18V15.5a.75.75 0 0 1-1.493.102l-.007-.102v-3.896c0-.648-.341-.948-1.008-.954-.696-.007-1.49.348-2.01.914l.001 3.936a.75.75 0 0 1-1.493.102l-.007-.102v-5.454a.75.75 0 0 1 1.429-.319c.65-.376 1.388-.584 2.096-.577zM8.5 7.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 1 1 0-2.5zm0 1a.25.25 0 1 0 0 .5.25.25 0 1 0 0-.5z",
  "linkedin-fat":
    "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 1 0 0-16zm-3.531 6.605a1 1 0 0 1 .993.883l.007.117V15.5a1 1 0 0 1-1.993.117l-.007-.117v-3.896a1 1 0 0 1 1-1zm5.789-1.704c1.516.015 2.65.96 2.735 2.515l.005.189V15.5a1 1 0 0 1-1.993.117l-.007-.117v-3.896c0-.503-.224-.699-.761-.704-.597-.006-1.286.29-1.759.765l.002 3.835a1 1 0 0 1-1.993.117l-.007-.117v-5.454a1 1 0 0 1 1.762-.648c.635-.326 1.337-.505 2.016-.498zM8.5 7.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3zm0 1a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1z",
  list: "M5 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z",
  "list-open":
    "M13.47 15.97a.75.75 0 0 1 .977-.073l.084.073L18 19.439l3.47-3.469a.75.75 0 0 1 .977-.073l.084.073a.75.75 0 0 1 .073.977l-.073.084-4 4a.75.75 0 0 1-.977.073l-.084-.073-4-4a.75.75 0 0 1 0-1.061zM20 2.75a.75.75 0 0 1 .102 1.493L20 4.25H2a.75.75 0 0 1-.102-1.493L2 2.75h18zm0 7a.75.75 0 0 1 .102 1.493L20 11.25H2a.75.75 0 0 1-.102-1.493L2 9.75h18zm-10 7a.75.75 0 0 1 .102 1.493L10 18.25H2a.75.75 0 0 1-.102-1.493L2 16.75h8z",
  logout:
    "M10 3a1 1 0 1 1 0 2l-.649.003-.591.011-.363.014-.339.021-.315.029-.293.038c-1.457.22-2.052.845-2.292 2.588l-.042.351-.034.381-.027.411-.021.442-.021.724-.008.526-.006.855v1.212l.006.855.008.526.021.724.021.442.027.411.034.381.042.351c.24 1.743.835 2.368 2.292 2.588l.293.038.315.029.339.021.363.014.591.011L10 19a1 1 0 1 1 0 2l-.519-.004-.493-.011-.468-.02-.444-.029-.213-.018-.408-.045c-2.646-.333-3.772-1.411-4.209-4.24l-.06-.438-.027-.229-.046-.478-.02-.25-.033-.521-.025-.55-.018-.58-.006-.302-.01-.952.002-.992.008-.627.015-.596.022-.565.014-.271.033-.521.042-.492.051-.465.06-.438c.437-2.829 1.563-3.907 4.209-4.24l.408-.045.432-.034.456-.024.48-.016.506-.007L10 3zm6.613 4.21l.094.083 4 4c.028.028.055.059.08.09l-.08-.09a1.01 1.01 0 0 1 .097.112l.05.075.021.037.032.063.019.043.024.067.016.054.013.053.01.056.007.061.003.055V12v.033l-.003.052L21 12a1.01 1.01 0 0 1-.011.149l-.01.056-.012.053-.016.054-.024.066-.019.043-.032.063-.021.036-.05.074-.013.018-.083.094-4 4a1 1 0 0 1-1.497-1.32l.083-.094L17.585 13H9a1 1 0 0 1-.117-1.993L9 11h8.585l-2.292-2.293a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083z",
  mirror:
    "M12 2.25c-7.226 0-9.75 2.639-9.75 9.75 0 7.414 2.336 9.75 9.75 9.75 7.16 0 9.75-2.583 9.75-9.221l-.005-.657-.016-.631-.028-.606-.018-.293-.046-.568c-.469-5.003-2.471-7.045-7.517-7.448l-.573-.038-.599-.025-.625-.012L12 2.25zm0 1.5l.597.005.569.015.274.012.528.032c4.117.299 5.693 1.723 6.138 5.626l.05.501.039.527.028.554.018.582.01.926c0 5.325-1.611 7.375-6.757 7.68l-.576.026c-.295.01-.6.015-.917.015l-.594-.005-.567-.015-.54-.025a19.08 19.08 0 0 1-.761-.059l-.475-.054c-3.316-.434-4.72-1.838-5.155-5.155l-.054-.475-.042-.501-.031-.527a27.8 27.8 0 0 1-.026-.84L3.75 12l.013-.884.024-.556.017-.268.044-.517.058-.492c.509-3.759 2.336-5.242 6.636-5.492l.562-.025.59-.012L12 3.75z",
  moon: "M10.33 4.684a9 9 0 0 0 9 9c.866 0 1.612.763 1.269 1.559-1.379 3.201-4.562 5.441-8.269 5.441a9 9 0 0 1-9-9c0-3.707 2.241-6.89 5.441-8.269.795-.343 1.559.403 1.559 1.269zM8.396 5.893C6.543 7.154 5.33 9.279 5.33 11.684a7 7 0 0 0 7 7c2.405 0 4.53-1.213 5.791-3.066-5.109-.559-9.167-4.616-9.725-9.725z",
  music:
    "M18.65 2.071a3 3 0 0 1 2.077 1.676c.161.35.253.728.272 1.095L21 5.06V16a3 3 0 1 1-6 0 3 3 0 0 1 3-3c.351 0 .688.06 1.001.171L19 8.281l-10 2.5V19a3 3 0 0 1-6 0 3 3 0 0 1 3-3c.351 0 .687.06 1 .171V7.137c-.004-.675.215-1.332.624-1.87A3.06 3.06 0 0 1 9.052 4.23l.218-.068 8.01-2.074a3 3 0 0 1 1.37-.017zM6 18a1 1 0 1 0 0 2 1 1 0 0 0 .993-.883l.006-.109.001-.025A1 1 0 0 0 6 18zm12-3a1 1 0 1 0 0 2 1 1 0 1 0 0-2zm-.122-10.993l-.107.02-7.988 2.068a1.06 1.06 0 0 0-.774.894L9 7.132v1.586l10-2.5V5.031a1 1 0 0 0-.372-.809 1 1 0 0 0-.411-.198c-.113-.025-.229-.03-.339-.017z",
  instagram:
    "M12.162 2.25l.16.001.625.012.599.025h0l.573.038c5.046.403 7.048 2.444 7.517 7.448h0l.046.568.018.293h0l.028.606.016.631.005.657c0 6.638-2.59 9.221-9.75 9.221-7.414 0-9.75-2.336-9.75-9.75 0-7.111 2.524-9.75 9.75-9.75l.322.002zM12 3.75l-.305.002h0l-.59.012-.562.025c-4.299.251-6.127 1.734-6.636 5.492h0l-.058.492-.044.517-.017.268h0l-.024.556A27.86 27.86 0 0 0 3.75 12h0l.005.594.026.84h0l.031.527.042.501h0l.054.475c.434 3.316 1.838 4.72 5.155 5.155h0l.475.054a19.08 19.08 0 0 0 .761.059h0l.54.025.567.015h0l.594.005c.317 0 .622-.005.917-.015h0l.576-.026c5.146-.305 6.757-2.355 6.757-7.68h0l-.01-.926-.018-.582-.028-.554-.039-.527h0l-.05-.501c-.445-3.903-2.021-5.327-6.138-5.626h0l-.528-.032-.274-.012h0l-.569-.015zm0 4a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 1 1 0-8.5zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 1 0 0-5.5zm4.5-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 1 1 0-2.5zm0 1a.25.25 0 1 0 0 .5.25.25 0 1 0 0-.5z",
  "instagram-fat":
    "M12 2c6.98 0 9.502 2.1 9.931 8.333h0l.034.597.022.621.007.32h0l.005.659C22 19.306 19.298 22 12 22 4.448 22 2 19.552 2 12 2 4.753 4.633 2 12 2zm0 2l-.303.001h0l-.585.012c-5.141.165-6.873 1.867-7.088 6.829h0l-.018.565L4 12h0l.005.59.014.562h0l.025.535.036.508c.33 3.957 1.769 5.396 5.726 5.726h0l.508.036.264.014h0l.548.019.285.006h0L12 20h0l.306-.002.591-.012.562-.025h0l.534-.038c4.078-.351 5.647-1.955 5.95-5.807h0l.032-.504.011-.261h0l.012-.541.002-.28-.001-.315h0l-.008-.607-.008-.293h0l-.022-.564-.032-.536c-.019-.261-.042-.512-.069-.753h0l-.06-.469c-.454-3.114-1.771-4.422-4.886-4.836h0l-.469-.054-.495-.042-.522-.031h0l-.55-.02-.285-.006h0zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 1 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zm4.5-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 1 1 0-3zm0 1a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1z",
  picture:
    "M15.068 12.996l.079.011c.046.01.117.038.679.404h0l4.765 3.105c.14.091.21.137.26.2a.52.52 0 0 1 .094.191c.019.079.013.157 0 .314-.054.669-.163 1.164-.382 1.593a4 4 0 0 1-1.748 1.748c-.774.394-1.765.432-3.606.436H8.79c-1.841-.004-2.831-.041-3.606-.436a4 4 0 0 1-1.748-1.748c-.139-.272-.233-.571-.298-.925-.029-.158-.043-.237-.027-.326.013-.074.051-.158.096-.217.055-.072.133-.12.288-.216h0l2.907-1.797.56-.32a.5.5 0 0 1 .2-.01c.04.006.098.022.589.262h0l.528.257.09.044c.374.183.751.367 1.159.421a2.5 2.5 0 0 0 1.061-.089c.393-.121.734-.365 1.073-.608h0l.081-.058 2.506-1.789.662-.433a.5.5 0 0 1 .237-.005zm3.748-9.56a4 4 0 0 1 1.748 1.748C21 6.039 21 7.16 21 9.4v3.52c0 .48 0 .721-.1.854a.5.5 0 0 1-.366.198c-.167.011-.368-.12-.77-.382l-2.845-1.854-.096-.063c-.396-.259-.793-.519-1.242-.619a2.5 2.5 0 0 0-1.186.025c-.445.119-.83.395-1.215.671l-.093.067-2.506 1.789-.49.337-.049.028c-.019.01-.03.014-.04.017a.5.5 0 0 1-.212.018c-.042-.006-.105-.023-.635-.28l-.528-.257-.083-.041c-.349-.17-.699-.342-1.081-.4a2.5 2.5 0 0 0-.999.05c-.374.096-.705.302-1.035.507l-.079.049-1.935 1.197C3.234 14.943 3 14.813 3 14.6v-5.81c.004-1.841.041-2.831.436-3.606a4 4 0 0 1 1.748-1.748c.815-.415 1.87-.435 3.903-.436H14.6c2.24 0 3.36 0 4.216.436zM9 7a2 2 0 1 0 0 4 2 2 0 1 0 0-4z",
  plus: "M12 5a1 1 0 0 1 .993.883L13 6v5h5a1 1 0 0 1 .117 1.993L18 13h-5v5a1 1 0 0 1-1.993.117L11 18v-5H6a1 1 0 0 1-.117-1.993L6 11h5V6a1 1 0 0 1 1-1z",
  profile:
    "M12 14.25c-4.784 0-8.75 1.576-8.75 4.25 0 1.646 2.128 2.677 5.426 3.07l.56.06.288.025.591.042.61.03.628.018.646.006.646-.006.628-.018.61-.03.591-.042.288-.025.56-.06c3.298-.393 5.426-1.424 5.426-3.07 0-2.51-4.175-4.25-8.75-4.25zm0 1.5c3.825 0 7.25 1.427 7.25 2.75 0 .305-.564.745-1.754 1.106-1.362.413-3.297.644-5.496.644s-4.135-.231-5.496-.644c-1.19-.361-1.754-.801-1.754-1.106 0-1.467 3.228-2.75 7.25-2.75zm0-13.5a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 1 0 0-10.5zm0 1.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 1 1 0-7.5z",
  "profile-fat":
    "M11.996 13.8c-5.013 0-9.2 1.664-9.2 4.7 0 2.079 2.555 3.233 6.432 3.584l.658.051.338.02.693.029.714.014.365.002.365-.002.714-.014.693-.029.338-.02.658-.051c.323-.029.637-.064.941-.105l.595-.088c3.002-.496 4.896-1.6 4.896-3.391 0-2.867-4.4-4.7-9.2-4.7zm6.792 4.629l.008.071-.145.089c-.257.2-.697.406-1.29.586-1.314.399-3.207.625-5.366.625s-4.051-.226-5.366-.625c-.593-.18-1.033-.386-1.29-.586l-.122-.096c-.013-.009-.019-.011-.022-.006l-.002.013c0-1.105 3.006-2.3 6.8-2.3 1.825 0 3.673.339 5.038.908 1.104.46 1.682.977 1.754 1.321zM11.995 1.8a5.7 5.7 0 1 0 0 11.4 5.7 5.7 0 1 0 0-11.4zm0 2.4a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 1 1 0-6.6z",
  search:
    "M10 2.25A7.75 7.75 0 0 1 17.75 10a7.72 7.72 0 0 1-1.765 4.924l5.545 5.546a.75.75 0 0 1-.977 1.133l-.084-.073-5.546-5.545A7.72 7.72 0 0 1 10 17.75a7.75 7.75 0 1 1 0-15.5zm0 1.5a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 1 0 0-12.5z",
  "settings-alt":
    "M11.959 2.25c.77 0 1.935.378 3.168.945h0l.532.254c2.135 1.058 4.334 2.592 4.949 3.65.993 1.709.993 8.094 0 9.802-.615 1.058-2.814 2.592-4.949 3.65h0l-.532.254c-1.233.567-2.398.945-3.168.945-2.286 0-7.523-2.913-8.648-4.849-.816-1.403-.942-8.181 0-9.802C4.355 5.301 9.742 2.25 11.959 2.25zm0 1.5c-1.686 0-6.577 2.77-7.352 4.103-.323.555-.462 2.3-.457 4.057h0l.009.657.022.645.034.619c.074 1.102.209 2.001.392 2.316.438.754 1.905 1.818 3.465 2.673h0l.522.277c1.308.669 2.61 1.153 3.364 1.153.695 0 1.956-.487 3.245-1.148h0l.516-.273c1.631-.89 3.192-1.995 3.59-2.681.722-1.243.722-7.052 0-8.295-.336-.578-1.496-1.452-2.827-2.246h0l-.506-.293h0l-.257-.142-.516-.273c-1.289-.662-2.55-1.148-3.245-1.148zm.002 4.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 1 1 0-7.5zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 1 0 0-4.5z",
  share:
    "M12 2.25a.75.75 0 1 1 0 1.5l-.594.005-.567.015-.54.025-.761.059-.475.054c-3.316.434-4.72 1.838-5.155 5.155l-.054.475-.042.501-.031.527-.026.84L3.75 12l.005.594.015.567.025.54.059.761.054.475c.434 3.316 1.838 4.72 5.155 5.155l.475.054.501.042.527.031.84.026.594.005c5.09 0 7.121-1.039 7.874-3.939a.75.75 0 1 1 1.452.377c-.96 3.696-3.63 5.061-9.326 5.061-7.414 0-9.75-2.336-9.75-9.75S4.586 2.25 12 2.25zm5.446 2.147l.084.073 4 4a.75.75 0 0 1 .073.977l-.073.084-4 4a.75.75 0 0 1-1.133-.977l.073-.084 2.719-2.72H13.5c-3.329 0-4.75 1.749-4.75 4.25a.75.75 0 1 1-1.5 0c0-3.196 1.928-5.639 5.971-5.746l.279-.004h5.689L16.47 5.53a.75.75 0 0 1-.073-.977l.073-.084a.75.75 0 0 1 .977-.073z",
  sun: "M12 19a1 1 0 0 1 1 1v.997a1 1 0 1 1-2 0V20a1 1 0 0 1 1-1zm6.211-2.204l.858.858a1 1 0 1 1-1.414 1.414l-.858-.858a1 1 0 1 1 1.414-1.414zm-11.006-.003a1 1 0 0 1 0 1.414l-.861.861a1 1 0 0 1-1.414-1.414l.861-.861a1 1 0 0 1 1.414 0zM12.004 6a6 6 0 1 1 0 12 6 6 0 1 1 0-12zm0 2a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM4 10.998a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm16.997 0a1 1 0 1 1 0 2H20a1 1 0 1 1 0-2h.997zM6.344 4.929l.864.864a1 1 0 1 1-1.414 1.414l-.864-.864a1 1 0 1 1 1.414-1.414zm12.726 0a1 1 0 0 1 0 1.414l-.865.865a1 1 0 0 1-1.414-1.414l.865-.864a1 1 0 0 1 1.414 0zM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1z",
  twitter:
    "M12.234 5.119c-.783.78-1.229 1.869-1.247 2.986v.111l-.067-.007c-2.399-.327-4.59-1.556-6.166-3.487a.75.75 0 0 0-1.235.107l-.106.2c-.633 1.277-.605 2.766-.026 4.003l.021.042-.014.004c-.283.1-.503.365-.503.709l.005.208c.058 1.172.601 2.271 1.44 3.056l.054.048-.051.057c-.155.189-.217.453-.131.712l.075.209c.421 1.102 1.195 1.974 2.16 2.481l.092.045-.059.028c-.7.301-1.466.473-2.273.512l-.36.008-.24-.041c-.246-.045-.408-.065-.6-.065-.724 0-1.028.925-.444 1.354 1.669 1.226 3.814 1.854 6.089 1.854l.31-.004c6.47-.165 10.985-5.493 10.985-11.528v-.191l-.269.233c.752-.628 1.407-1.314 1.941-2.062l.053-.084c.278-.509-.12-1.093-.641-1.106l-.058.001.105-.228c.035-.082.069-.166.1-.251.26-.694-.537-1.304-1.139-.873l-.136.094c-.357.236-.716.396-1.24.555l-.298.084-.155-.139c-1.67-1.41-4.148-1.33-5.807.213l-.161.152zm5.398 1.176a.75.75 0 0 0 .572.181l.056-.011-.024.033c-.263.398-.063.957.373 1.114l.075.021.026-.023a.75.75 0 0 0-.269.576v.534c0 5.347-4.041 10.032-9.794 10.032l-.368-.006c-.732-.025-1.442-.125-2.115-.298l-.215-.06.168-.043a7.53 7.53 0 0 0 2.798-1.47c.538-.449.22-1.326-.481-1.326l-.179-.006c-.829-.053-1.58-.474-2.098-1.15l-.055-.075.189-.03a3.28 3.28 0 0 0 .611-.175c.696-.279.597-1.295-.141-1.433l-.165-.037c-.808-.207-1.493-.792-1.876-1.533l-.092-.194.198.025a5.36 5.36 0 0 0 .518.024c.742 0 1.033-.962.417-1.374l-.149-.107c-.82-.63-1.241-1.677-1.156-2.7l.017-.151.053.053c1.972 1.898 4.547 3.006 7.289 3.104a.75.75 0 0 0 .755-.931c-.251-1.008.084-2.111.836-2.781 1.233-1.147 3.081-1.095 4.153.144l.074.074z",
  discord:
    "M20.317,4.37c-1.53-0.702-3.17-1.219-4.885-1.515c-0.031-0.006-0.062,0.009-0.079,0.037   c-0.211,0.375-0.445,0.865-0.608,1.249c-1.845-0.276-3.68-0.276-5.487,0C9.095,3.748,8.852,3.267,8.641,2.892   C8.624,2.864,8.593,2.85,8.562,2.855C6.848,3.15,5.208,3.667,3.677,4.37C3.664,4.375,3.652,4.385,3.645,4.397   c-3.111,4.648-3.964,9.182-3.546,13.66c0.002,0.022,0.014,0.043,0.031,0.056c2.053,1.508,4.041,2.423,5.993,3.029   c0.031,0.01,0.064-0.002,0.084-0.028c0.462-0.63,0.873-1.295,1.226-1.994c0.021-0.041,0.001-0.09-0.042-0.106   c-0.653-0.248-1.274-0.55-1.872-0.892c-0.047-0.028-0.051-0.095-0.008-0.128c0.126-0.094,0.252-0.192,0.372-0.291   c0.022-0.018,0.052-0.022,0.078-0.01c3.928,1.793,8.18,1.793,12.061,0c0.026-0.012,0.056-0.009,0.079,0.01   c0.12,0.099,0.246,0.198,0.373,0.292c0.044,0.032,0.041,0.1-0.007,0.128c-0.598,0.349-1.219,0.645-1.873,0.891   c-0.043,0.016-0.061,0.066-0.041,0.107c0.36,0.698,0.772,1.363,1.225,1.993c0.019,0.027,0.053,0.038,0.084,0.029   c1.961-0.607,3.95-1.522,6.002-3.029c0.018-0.013,0.029-0.033,0.031-0.055c0.5-5.177-0.838-9.674-3.548-13.66   C20.342,4.385,20.33,4.375,20.317,4.37z M8.02,15.331c-1.183,0-2.157-1.086-2.157-2.419s0.955-2.419,2.157-2.419   c1.211,0,2.176,1.095,2.157,2.419C10.177,14.246,9.221,15.331,8.02,15.331z M15.995,15.331c-1.182,0-2.157-1.086-2.157-2.419   s0.955-2.419,2.157-2.419c1.211,0,2.176,1.095,2.157,2.419C18.152,14.246,17.206,15.331,15.995,15.331z",
  "discord-fat":
    "M20.317,4.37c-1.53-0.702-3.17-1.219-4.885-1.515c-0.031-0.006-0.062,0.009-0.079,0.037   c-0.211,0.375-0.445,0.865-0.608,1.249c-1.845-0.276-3.68-0.276-5.487,0C9.095,3.748,8.852,3.267,8.641,2.892   C8.624,2.864,8.593,2.85,8.562,2.855C6.848,3.15,5.208,3.667,3.677,4.37C3.664,4.375,3.652,4.385,3.645,4.397   c-3.111,4.648-3.964,9.182-3.546,13.66c0.002,0.022,0.014,0.043,0.031,0.056c2.053,1.508,4.041,2.423,5.993,3.029   c0.031,0.01,0.064-0.002,0.084-0.028c0.462-0.63,0.873-1.295,1.226-1.994c0.021-0.041,0.001-0.09-0.042-0.106   c-0.653-0.248-1.274-0.55-1.872-0.892c-0.047-0.028-0.051-0.095-0.008-0.128c0.126-0.094,0.252-0.192,0.372-0.291   c0.022-0.018,0.052-0.022,0.078-0.01c3.928,1.793,8.18,1.793,12.061,0c0.026-0.012,0.056-0.009,0.079,0.01   c0.12,0.099,0.246,0.198,0.373,0.292c0.044,0.032,0.041,0.1-0.007,0.128c-0.598,0.349-1.219,0.645-1.873,0.891   c-0.043,0.016-0.061,0.066-0.041,0.107c0.36,0.698,0.772,1.363,1.225,1.993c0.019,0.027,0.053,0.038,0.084,0.029   c1.961-0.607,3.95-1.522,6.002-3.029c0.018-0.013,0.029-0.033,0.031-0.055c0.5-5.177-0.838-9.674-3.548-13.66   C20.342,4.385,20.33,4.375,20.317,4.37z M8.02,15.331c-1.183,0-2.157-1.086-2.157-2.419s0.955-2.419,2.157-2.419   c1.211,0,2.176,1.095,2.157,2.419C10.177,14.246,9.221,15.331,8.02,15.331z M15.995,15.331c-1.182,0-2.157-1.086-2.157-2.419   s0.955-2.419,2.157-2.419c1.211,0,2.176,1.095,2.157,2.419C18.152,14.246,17.206,15.331,15.995,15.331z",
  "twitter-fat":
    "M12.061 5.436c-.739.732-1.195 1.725-1.302 2.768l-.018.223-.092-.014c-2.217-.377-4.234-1.551-5.702-3.35a1 1 0 0 0-1.647.143l-.108.204c-.616 1.236-.644 2.66-.172 3.895l.061.151-.019.014a.99.99 0 0 0-.422.816l.005.212c.054 1.129.533 2.193 1.286 3l.124.127-.032.057a.99.99 0 0 0-.054.762l.076.213c.373.98 1.012 1.788 1.814 2.339l.096.062-.106.038a6.42 6.42 0 0 1-1.648.295l-.35.008-.205-.037a3.35 3.35 0 0 0-.645-.07c-.966 0-1.371 1.234-.592 1.806C4.122 20.358 6.32 21 8.645 21l.312-.004c6.513-.164 11.088-5.445 11.229-11.49l.003-.367.275-.252c.507-.483.96-.997 1.351-1.545l.059-.092c.319-.556.025-1.185-.473-1.409l-.075-.03.078-.193c.333-.891-.639-1.678-1.428-1.222l-.218.147c-.342.226-.689.379-1.209.535l-.126.035-.044-.038c-1.767-1.506-4.398-1.427-6.154.208l-.163.153zm5.394 1.536c.123.11.269.188.43.228l-.011.067a1.04 1.04 0 0 0 .371.923l.054.04-.04.088a1 1 0 0 0-.07.367v.534c0 5.217-3.938 9.782-9.544 9.782l-.358-.006a9.81 9.81 0 0 1-1.399-.147l.228-.09c.705-.297 1.363-.696 1.957-1.192.688-.574.327-1.671-.527-1.762l-.294-.012a2.58 2.58 0 0 1-1.587-.706l-.103-.103a3.27 3.27 0 0 0 .431-.139c.928-.372.796-1.726-.187-1.911l-.157-.035c-.62-.161-1.162-.569-1.526-1.099l-.059-.092c.091.004.184.006.279.006.949 0 1.346-1.182.648-1.762l-.235-.171c-.588-.455-.952-1.148-1.041-1.88l-.018-.217.116.103c1.949 1.683 4.396 2.659 6.991 2.752a1 1 0 0 0 1.028-1.128l-.022-.114c-.229-.918.077-1.926.76-2.534 1.135-1.056 2.821-1.009 3.797.121l.087.089z",
  upload:
    "M11.898 8.005l.045-.004.024-.001.032-.002h0l.058.003L12 7.998c.055 0 .109.006.161.017a.8.8 0 0 1 .099.029l.083.037.036.019.043.028.039.028.071.062 4 4a.75.75 0 0 1-.99 1.123l-.071-.062-2.723-2.723.001 9.192a.75.75 0 0 1-1.495.087l-.005-.087-.001-9.188-2.717 2.719a.75.75 0 0 1-.99.062l-.071-.062a.75.75 0 0 1-.062-.99l.062-.071 3.98-3.982a.75.75 0 0 1 .396-.223h0l.051-.009zm.615-5.004l.735.008.465.01.662.023.418.02.4.025.382.03.365.036.176.02.34.044.164.024h0l.315.053c2.202.406 3.183 1.32 3.577 3.252l.051.276.023.143.041.297.018.154.031.318.025.332.019.347.014.362.009.378.005.596a.75.75 0 1 1-1.5 0l-.002-.554-.009-.514-.01-.321-.015-.304-.02-.288-.025-.272-.032-.257-.038-.242c-.266-1.484-.981-2.093-2.848-2.339l-.305-.036-.324-.03-.17-.013-.355-.023-.376-.018-.606-.02-.657-.012-.96-.007h-.994l-.96.007-.657.012-.606.02-.376.018-.355.023-.334.028-.314.033-.295.039c-1.807.265-2.48.907-2.723 2.437l-.035.249-.015.13-.025.272-.02.288-.015.304-.014.488-.006.527-.001.374a.75.75 0 1 1-1.5 0l.002-.401.011-.572.022-.538.022-.34.028-.325.034-.311.019-.15.044-.29.025-.14.055-.27c.294-1.315.882-2.14 1.977-2.649l.226-.098c.349-.14.745-.253 1.194-.343l.307-.057.16-.026.331-.047.172-.021.357-.038.374-.033L9 3.074l.409-.023.428-.018.446-.014.705-.014.495-.005h1.03z",
  "upload-alt":
    "M18 14l.627.013.383.024C21.229 14.22 22 15.146 22 18c0 1.95-.506 3.001-2.025 3.523l-.187.06-.172.049-.196.05-.203.046-.213.041-.227.037-.244.033-.265.029-.289.025-.485.032-.557.025-.641.019-1.284.02-1.963.01-2.808-.002-1.533-.011-1.004-.017-.641-.019-.557-.025-.485-.032-.289-.025-.265-.029-.244-.033-.227-.037-.213-.041-.203-.046-.196-.05-.172-.049C2.547 21.083 2 20.028 2 18c0-2.854.771-3.78 2.99-3.963l.383-.024L6 14a1 1 0 0 1 .117 1.993L6 16l-.653.004-.269.009-.231.018c-.567.062-.754.25-.817.817l-.018.231-.009.269-.003.311.001.61.004.168.015.232.018.141.012.067.031.126c.085.282.257.484.607.629l.161.059.089.027.197.049.222.043.25.037.279.032.309.027.341.023.375.019.856.027 1.009.016 1.829.009 3.751-.003 1.131-.009.741-.013.655-.019.575-.027.341-.023.309-.027.279-.032.128-.018.236-.04.21-.046.185-.052.161-.059c.275-.114.441-.263.541-.457l.048-.111.037-.12.015-.064.022-.135.008-.072.015-.231L20 18l-.004-.661-.009-.267-.018-.229c-.063-.563-.252-.749-.817-.811l-.23-.018-.269-.009-.31-.003H18a1 1 0 1 1 0-2zM12 2h.019l.07.004L12 2a1.01 1.01 0 0 1 .149.011l.052.009.065.015.046.014.059.021.052.023.061.031.036.021.074.05.018.013.094.083 4 4a1 1 0 0 1-1.32 1.497l-.094-.083L13 5.415V13a1 1 0 0 1-1.993.117L11 13V5.415L8.707 7.707a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094 4-4 .082-.073-.082.073a1.01 1.01 0 0 1 .112-.097l.075-.05.037-.021.061-.031.052-.022.06-.022.046-.014.065-.016.052-.009.058-.007.072-.004z",
  checkMark:
    "M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50  l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z",
  "up-arrow":
    "M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z",
  "down-arrow":
    "M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z",
};

type IconProps = {
  className?: string;
  name: string;
  size?: number | string;
  fill?: string;
};

const Icon = ({ className, name, size, fill }: IconProps) => (
  <svg
    className={cn(styles.icon, className)}
    width={size || 22}
    height={size || 22}
    viewBox="0 0 24 24"
  >
    <path fill={fill} d={icons[name]}></path>
  </svg>
);

export default Icon;
