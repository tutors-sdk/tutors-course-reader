<script lang="ts">
  import { currentCourse, currentUser } from "../../../stores";
  import type { User } from "tutors-reader-lib/src/metrics/metrics-types";
  import { Course } from "tutors-reader-lib/src/course/course";
  import Icon from "../../iconography/Icon.svelte";
  import { getUserId } from "tutors-reader-lib/src/utils/auth-utils";

  let user: User;
  let course: Course;
  const timeApp = "https://tutors-time-reader.netlify.app";
  let timeUrl = "";
  let liveUrl = "";
  let gitUrl = "";

  function setTimeUrls() {
    timeUrl = `${timeApp}/#/time/${course?.url}?${getUserId()}`;
    liveUrl = `${timeApp}/#/live/${course?.url}?${getUserId()}`;
  }

  currentUser.subscribe(async current => {
    if (current) {
      user = current;
      gitUrl = `https://github.com/${user.nickname}`;
      if (user && current) {
        setTimeUrls();
      }
    }
  });
  currentCourse.subscribe(async current => {
    if (current) {
      course = current;
      if (user && current) {
        setTimeUrls();
      }
    }
  });
</script>
{#if $currentUser && $currentCourse.authLevel > 0 }
  <div class="flex-none tooltip tooltip-top dropdown dropdown-end dropdown-hover">
    <div tabindex="0">
      <div class="avatar w-36 flex content-center tooltip  tooltip-bottom" data-tip="Tutors Time Options">
        <div class="w-12 h-12 rounded-full">
          <img src="{$currentUser.picture}" alt="{$currentUser.nickname}">
        </div>
        <div class="text-xs mt-2 font-thin">{$currentUser.name}</div>
      </div>
    </div>
    <ul tabindex="0" class="shadow menu dropdown-content bg-base-100 text-base-content rounded-box w-44 text-sm z-auto">
      <li>
        <a href={timeUrl} target="_blank">
          <Icon type="tutorsTime" toolTip="Tutors Time" />
          <div class="ml-2"> Tutors Time</div>
        </a>
      </li>
      <li>
        <a href={liveUrl} target="_blank">
          <Icon type="live" toolTip="Tutors Time" />
          <div class="ml-2">Tutors Live</div>
        </a>
      </li>
      <li>
        <a href="{gitUrl}" target="_blank">
          <Icon type="github" toolTip="Tutors Time" />
          <div class="ml-2">Github Profile</div>
        </a>
      </li>
      <li>
        <a href="#/logout">
          <Icon type="logout" toolTip="Tutors Time" />
          <div class="ml-2">Logout</div>
        </a>
      </li>
    </ul>
  </div>
{/if}
