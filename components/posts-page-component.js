import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, putLike,  } from "../index.js";



export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts.map((post, index) => {

    let likes = '0';
    if (post.likes.length === 1) {
      likes = post.likes[0].name
    }else if (post.likes.length === 2) {
      likes = `${post.likes[0].name}, ${post.likes[1].name}`;
    } else if (post.likes.length > 2) {
      likes = `${post.likes[0].name}, ${post.likes[1].name}  ${post.likes.length - 2}`;
    }
   return ` <li data-index= "${index}"class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${likes}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                  </li>`;
  }).join("");
  const appAddPost =
  ` <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${appHtml}
                </ul>
              </div>`;
  appEl.innerHTML = appAddPost;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

for (let likeEl of document.querySelectorAll(".like-button")) {
  likeEl.addEventListener("click", (event) => {
    event.stopPropagation();
    likeEl.classList.add("load-like");
    if(!user) {
      alert('Авторизуйтесь,пожалуйста');
      return;
    }
    putLike({postId: likeEl.dataset.postId});
  });
}

}