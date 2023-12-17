import { ref, Ref } from "vue";

interface FileDetails {
  name: string;
  size: number;
  lastModified: number;
  type: string;
}

class UploadableFile {
  file: File;
  id: string;
  url: string;
  status: null | string;

  constructor(file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}

export default function () {
  const files: Ref<UploadableFile[]> = ref([]);

  function addFiles(newFiles: File[]) {
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(otherId: string) {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  }

  return { files, addFiles, removeFile };
}
