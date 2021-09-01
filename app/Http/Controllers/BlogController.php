<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class BlogController extends Controller
{
    function index(Request $request)
    {

        return Blog::with(['user:id,name', 'category:id,name'])->withCount(['likes', 'likeStatus' => fn ($qry) => $qry->where([['user_id', $request->current_user], ['is_liked', true]])])->paginate(6);
    }

    function show($id)
    {
        $blogs = Blog::find($id)->load('user:id,name');
        $blogs['related_post'] = Blog::where('category_id', '=', $blogs->category_id)->latest()->take(3)->get();
        return $blogs;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->input(), [
            'discription' => 'required',
            'title' => 'required',
            'category_id' => 'required',
        ]);

        if ($validator->fails()) return response(['success' => false, 'errors' => $validator->errors()]);

        $timeStamp = Carbon::now()->timestamp;

        $created = $request->only('discription', 'title', 'category_id', 'user_id');


        $newFile = "$request->user_id.{$request->img->getClientOriginalExtension()}";
        $request->img->move(public_path("/images/posts"), $newFile);
        $created['img'] = $newFile;

        $blog = Blog::create($created);
        return response(['success' => true, 'message' => "Blog is added successfully!"]);
    }
}
