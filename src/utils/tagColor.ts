const palette = [
    'tag--red','tag--orange','tag--amber','tag--yellow','tag--lime','tag--green',
    'tag--teal','tag--cyan','tag--blue','tag--indigo','tag--violet','tag--purple',
    'tag--pink','tag--rose',
  ]
  
  /** 將標籤字串雜湊映射到固定顏色 class */
  export function tagClass(tag: string) {
    let h = 0
    for (let i = 0; i < tag.length; i++) {
      h = (h * 31 + tag.charCodeAt(i)) | 0
    }
    const idx = Math.abs(h) % palette.length
    return `tag ${palette[idx]}`
  }
  