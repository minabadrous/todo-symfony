<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager,  TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read')]
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: "POST")]
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray()
            ]);
        } catch (Exception $exception) {
            return $this->json([
                '' => ''
            ]);
        }
    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: "PUT")]
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }

        return $this->json([
            'message' => 'todo has been updated'
        ]);
    }

    #[Route('/delete/{id}', name: 'api_todo_delete')]
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }

        return $this->json([
            'message' => 'todo has been deleted'
        ]);
    }
}
