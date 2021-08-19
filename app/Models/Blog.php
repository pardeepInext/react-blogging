<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
  use HasFactory;
  protected $fillable = ['discription', 'title', 'img', 'category_id', 'user_id'];
  protected $appends = ['figure', 'blog_date'];

  function category()
  {
    return  $this->hasOne(Category::class, 'id');
  }

  function user()
  {
    return $this->hasOne(User::class, 'id', 'user_id');
  }

  function relatedPost()
  {
    return $this->hasMany(blog::class, 'parent_id', 'id');
  }

  function getFigureAttribute()
  {
    return $this->img ? asset("images/$this->img") : "";
  }

  function getBlogDateAttribute()
  {
    return date('M d,Y', strtotime($this->updated_at));
  }
}
