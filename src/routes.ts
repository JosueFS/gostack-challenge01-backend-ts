import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

interface Repository {
    id: string;
    title: string;
    url: string;
    techs: string[];
    likes: number;
}

const repositories: Repository[] = [];

export function index(request: Request, response: Response){
    return response.json(repositories)
}
export function create(request: Request, response: Response){
    const { title, url, techs } = request.body;

    const newRepository: Repository = { id: uuid(), title, url, techs, likes: 0  };

    repositories.push(newRepository);

    return response.json(newRepository);
}
export function update(request: Request, response: Response){
    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repoIndex = repositories.findIndex(r => r.id === id);

    const updatedRepo = {
        id,
        title,
        url,
        techs,
        likes: repositories[repoIndex].likes
    }

    repositories[repoIndex] = updatedRepo;

    return response.json(updatedRepo);
}
export function destroy(request: Request, response: Response){
    const { id } = request.params;

    const repoIndex = repositories.findIndex(r => r.id === id);

    repositories.splice(repoIndex, 1);

    return response.status(204).send();
}
export function likeRepository(request: Request, response: Response){
    const { id } = request.params;

    const likedRepo = repositories.find(r => r.id === id);

    if (!likedRepo) {
        return response.status(400).json({ error: 'Repository not found!' })
    }

    likedRepo.likes += 1;
    
    return response.json(likedRepo);
}