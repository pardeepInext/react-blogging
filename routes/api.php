<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserConroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::middleware('auth:sanctum')->group(function () {
});


Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/socialauth', [AuthController::class, 'socialAuth']);
Route::get('/notification/{id}', [UserConroller::class, 'notification']);
Route::post('/notification', [UserConroller::class, 'readNotification']);
Route::apiResources([
    "blogs" => BlogController::class
]);

Route::post('/likes', [LikeController::class, 'index']);


Broadcast::routes(['middleware' => ['auth:sanctum']]);
