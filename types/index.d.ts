declare module "#app" {
  interface NuxtApp {
    $api: any;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $api: any;
  }
}

export {};
