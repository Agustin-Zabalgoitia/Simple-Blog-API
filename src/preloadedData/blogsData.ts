import { BlogCreationAttributes } from "../models/blogsModel";

const blogsDummyData: Array<BlogCreationAttributes> = [
  {
    projectId: 1,
    userId: 2,
    title: "First Blog",
    content: "*this is our first blog*",
  },
  {
    projectId: 1,
    userId: 1,
    title: "Second Blog",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dapibus nunc. Aliquam in bibendum velit, congue laoreet tellus. Vivamus non feugiat est, non consequat neque. Maecenas nec lectus in arcu mattis rutrum. Donec ac tristique eros, ut consectetur nisl. Vestibulum sit amet leo at massa porttitor pellentesque. Donec quis auctor elit. Pellentesque feugiat dignissim imperdiet. Proin nec consectetur sapien. Curabitur quis condimentum nulla. Ut tortor massa, egestas vitae aliquet eget, malesuada eget mi. Praesent leo diam, gravida a elit sit amet, egestas blandit dui. Praesent tristique dapibus nunc a fringilla. Aenean porta pellentesque nunc et ullamcorper. Duis ut justo in felis dictum vehicula. ",
  },
  {
    projectId: 2,
    userId: 1,
    title: "Another Blog",
    content:
      " Sed fermentum enim nunc, a blandit massa consectetur id. Fusce venenatis commodo mollis. Cras placerat feugiat rutrum. Duis mattis facilisis placerat. Curabitur finibus leo ac quam pellentesque, sed viverra orci pulvinar. Morbi non efficitur velit, et sodales mi. Duis ante orci, dapibus at felis nec, blandit vestibulum mi. Sed placerat ullamcorper enim quis vehicula. Aliquam erat volutpat. Curabitur eu vulputate libero. Vestibulum non vulputate mauris. Nam sed ex tempus elit porta venenatis. Fusce placerat leo ex. Morbi tincidunt, arcu ac ullamcorper euismod, nisl tellus euismod ante, nec rhoncus nulla lectus nec leo. Nullam consectetur diam a tellus pulvinar mollis. Morbi diam sapien, pulvinar ultricies odio a, rhoncus volutpat sem. Vivamus aliquam ex sed velit elementum, sit amet congue lacus euismod. Quisque id sem leo. Donec placerat sollicitudin mi. Vivamus in eros eget eros viverra pellentesque. Nunc ac orci eget sem luctus tempus. Nullam vitae nulla vitae libero interdum ultrices. Etiam at facilisis nisi. Maecenas sed mauris id lorem vehicula sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin dapibus et nibh nec elementum. In tempus scelerisque ultricies. Curabitur placerat tortor viverra risus sodales suscipit. ",
  },
  {
    projectId: 3,
    userId: 3,
    title: "Last Blog",
    content:
      "Etiam purus urna, cursus et diam sed, fermentum pharetra lorem. Donec fringilla eros augue, ac tincidunt augue dignissim at. Fusce pulvinar scelerisque hendrerit. Fusce augue sapien, mattis ac odio quis, malesuada pellentesque sapien. Vestibulum tincidunt semper nisi quis lobortis. Phasellus vehicula nec ipsum et euismod. Nullam posuere egestas diam, non consectetur erat lacinia at. ",
  },
];

export default blogsDummyData;
