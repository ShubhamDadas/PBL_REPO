

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");


owner_route.use(express.json());
owner_route.use(express.urlencoded({extended:false}));

owner_route.use(express.static(static_path));
owner_route.set("view engine","ejs");
owner_route.set("views",template_path);