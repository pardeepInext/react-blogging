<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\BlogResource;
use App\Models\Blog;

class BlogController extends Controller
{
    function index()
    {
        return BlogResource::collection(Blog::paginate(6));
    }

    function show($id)
    {
        return Blog::find($id)->load('user:id,name', 'relatedPost.user');
    }
}
