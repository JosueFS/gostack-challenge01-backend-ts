"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRepository = exports.destroy = exports.update = exports.create = exports.index = void 0;
var uuidv4_1 = require("uuidv4");
var repositories = [];
function index(request, response) {
    return response.json(repositories);
}
exports.index = index;
function create(request, response) {
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var newRepository = { id: uuidv4_1.uuid(), title: title, url: url, techs: techs, likes: 0 };
    repositories.push(newRepository);
    return response.json(newRepository);
}
exports.create = create;
function update(request, response) {
    var id = request.params.id;
    var _a = request.body, title = _a.title, url = _a.url, techs = _a.techs;
    var repoIndex = repositories.findIndex(function (r) { return r.id === id; });
    var updatedRepo = {
        id: id,
        title: title,
        url: url,
        techs: techs,
        likes: repositories[repoIndex].likes
    };
    repositories[repoIndex] = updatedRepo;
    return response.json(updatedRepo);
}
exports.update = update;
function destroy(request, response) {
    var id = request.params.id;
    var repoIndex = repositories.findIndex(function (r) { return r.id === id; });
    repositories.splice(repoIndex, 1);
    return response.status(204).send();
}
exports.destroy = destroy;
function likeRepository(request, response) {
    var id = request.params.id;
    var likedRepo = repositories.find(function (r) { return r.id === id; });
    if (!likedRepo) {
        return response.status(400).json({ error: 'Repository not found!' });
    }
    likedRepo.likes += 1;
    return response.json(likedRepo);
}
exports.likeRepository = likeRepository;
