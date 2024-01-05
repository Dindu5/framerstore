<template>
  <div class="account-page container">
    <div class="account-page-user">
      <img src="/images/users/user-2x.png" alt="User" />
      <h1>Hi, Whitney</h1>
    </div>
    <TabWrapper :currentTab="currentTab">
      <Tab title="Moodboard" value="moodboard">
        <div class="account-page--moodboard">
          <MoodBoardCard
            v-for="(item, i) in moodBoardItems"
            :key="i"
            :cardData="item"
          />
        </div>
      </Tab>
      <Tab title="My Templates" value="my_templates">
        <div class="account-page--templates">
          <MyTemplateCard
            v-for="(item, i) in myTemplates"
            :key="i"
            :cardData="item"
          />
        </div>
      </Tab>
      <Tab title="Submit a template" value="submit_a_template">
        <SubmitTemplateForm />
      </Tab>
      <Tab title="Settings" value="settings">
        <div class="account-page-main_panel">
          <h2>Account Settings</h2>
          <p>
            Manage your profile, security, payment and notification settings
          </p>
          <form>
            <div>
              <label>Avatar</label>
              <div class="account-page-avatar">
                <div>
                  <span class="material-symbols-rounded"> image </span>
                </div>
                <p>
                  Update your avatar by clicking the image below. 288x288 px
                  size recommended in PNG or JPG format
                </p>
              </div>
            </div>
            <div>
              <label>Full name</label>
              <input class="text-input" type="text" />
            </div>
            <div>
              <label>Email</label>
              <p>This email will be associated with your Framestore account.</p>
              <input class="text-input" type="text" />
            </div>
            <div>
              <label>Password</label>
              <p>Set your password.</p>
              <input class="text-input" type="password" />
              <input class="text-input" type="password" />
            </div>
            <button class="btn btn-primary btn-full">Save Changes</button>
            <hr />
          </form>
          <button class="btn btn-secondary-outline">Delete Account</button>
        </div>
      </Tab>
    </TabWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});
const route = useRoute();

const myTemplates = [
  {
    image: "/images/mood-board/img-0.jpg",
    title: "HarmomyWellness - Spa and gym  Framer template",
    status: "PUBLISHED",
    description:
      "This is a luxurious template created to showcase the amazing services your business has to offer with a range of unique pages and a blog. ",
  },
  {
    image: "/images/mood-board/img-1.jpg",
    title: "HarmomyWellness - Spa and gym  Framer template",
    status: "PUBLISHED",
    description:
      "This is a luxurious template created to showcase the amazing services your business has to offer with a range of unique pages and a blog. ",
  },
];

const moodBoardItems = [
  {
    templates: [
      { img: "/images/mood-board/img-0.jpg" },
      { img: "/images/mood-board/img-1.jpg" },
      { img: "/images/mood-board/img-2.jpg" },
      { img: "/images/mood-board/img-3.jpg" },
      { img: "/images/mood-board/img-7.jpg" },
    ],
    title: "Minimal",
  },
  {
    templates: [
      { img: "/images/mood-board/img-4.jpg" },
      { img: "/images/mood-board/img-5.jpg" },
      { img: "/images/mood-board/img-6.jpg" },
    ],
    title: "Clean Fashion Templates",
  },
  {
    templates: [
      { img: "/images/mood-board/img-5.jpg" },
      { img: "/images/mood-board/img-1.jpg" },
      { img: "/images/mood-board/img-2.jpg" },
      { img: "/images/mood-board/img-3.jpg" },
    ],
    title: "Colorful",
  },
];

const currentTab = ref("");

if (route?.query?.tab) {
  currentTab.value = route?.query?.tab as any;
}
</script>
